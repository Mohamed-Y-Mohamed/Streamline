"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTasks = async (req, res) => {
    const { projectId } = req.query;
    try {
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
    }
    catch (error) {
        res.status(500).json({ message: `Error Retrieving Tasks: ${error.message}` });
    }
};
exports.getTasks = getTasks;
