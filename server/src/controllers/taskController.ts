// controllers/taskController.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserIdFromSession } from "../utils/session";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const userId = await getUserIdFromSession(req);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { projectId } = req.query;
  try {
    // Return tasks for the given project that belong to or are assigned to the current user
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
        OR: [
          { authorUserId: userId },
          { assignedUserId: userId },
        ],
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving tasks: ${error.message}` });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const userId = await getUserIdFromSession(req);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;
  try {
    // Ensure at least the authorUserId is the current user if you want strict security:
    // For now, we do not enforce that, but you can add:
    // if (authorUserId !== userId) { ...error... }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });
    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating a task: ${error.message}` });
  }
};

export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  const userId = await getUserIdFromSession(req);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { taskId } = req.params;
  const { status } = req.body;
  try {
    // Make sure the task is associated to this user before updating
    const existingTask = await prisma.task.findUnique({ where: { id: Number(taskId) } });

    if (!existingTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (existingTask.authorUserId !== userId && existingTask.assignedUserId !== userId) {
      res.status(403).json({ message: "Forbidden: You do not have access to this task" });
      return;
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(taskId) },
      data: { status },
    });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating task: ${error.message}` });
  }
};

export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
  const userId = await getUserIdFromSession(req);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { userId: targetUserId } = req.params;
  // If you want to only let the user get their own tasks,
  // ensure targetUserId == userId:
  if (Number(targetUserId) !== userId) {
    res.status(403).json({ message: "Forbidden: You can only view your own tasks" });
    return;
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { authorUserId: userId },
          { assignedUserId: userId },
        ],
      },
      include: {
        author: true,
        assignee: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving user's tasks: ${error.message}` });
  }
};
