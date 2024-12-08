import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTasks = async (
    req: Request,
     res: Response
    ): Promise<void> => {
        const{projectId}=req.query;

        try{
           const Tasks = await prisma.task.findMany({
  where: { projectId: Number(projectId) },
  include: {
    author: true,
    assignee: true,
    comments: true,
    project: true
  }
});

res.json(Tasks);
        } catch (error: any) {
  res.status(500).json({ message: `Error Retrieving Tasks: ${error.message}` });
}
    
    }