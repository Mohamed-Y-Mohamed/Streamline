// controllers/projectController.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserIdFromSession } from "../utils/session";

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  // In your projects controller
const userId = await getUserIdFromSession(req);
if (!userId) {
  res.status(401).json({ message: "Unauthorized" });
  return;
}

const projects = await prisma.project.findMany({
  where: {
    tasks: {
      some: {
        OR: [
          { authorUserId: userId },
          { assignedUserId: userId },
        ],
      },
    },
  },
});

res.json(projects);

export const createProject = async (req: Request, res: Response): Promise<void> => {
  const userId = await getUserIdFromSession(req);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { name, description, startDate, endDate } = req.body;
  try {
    // Currently, just create the project without restrictions.
    // If you want to link the project to the user, you'd add that logic here.
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating a project: ${error.message}` });
  }
};
