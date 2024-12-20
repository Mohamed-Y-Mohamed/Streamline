// controllers/searchController.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserIdFromSession } from "../utils/session";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  const userId = await getUserIdFromSession(req);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { query } = req.query;
  const searchQuery = (query as string) || "";

  try {
    // Tasks relevant to the user
    const tasks = await prisma.task.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: searchQuery, mode: 'insensitive' } },
              { description: { contains: searchQuery, mode: 'insensitive' } },
            ],
          },
          {
            OR: [
              { authorUserId: userId },
              { assignedUserId: userId },
            ],
          },
        ],
      },
    });

    // Projects relevant to the user (at least one task authored or assigned to this user)
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { description: { contains: searchQuery, mode: 'insensitive' } },
        ],
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

    // Users: If you only want to show the signed-in user if they match:
    // Adjust logic as needed. Here we only show the current user if their username matches.
    const users = await prisma.user.findMany({
      where: {
        userId: userId,
        username: { contains: searchQuery, mode: 'insensitive' },
      },
    });

    res.json({ tasks, projects, users });
  } catch (error: any) {
    res.status(500).json({ message: `Error performing search: ${error.message}` });
  }
};
