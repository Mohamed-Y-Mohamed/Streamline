"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = void 0;
const client_1 = require("@prisma/client");
const session_1 = require("../utils/session");
const prisma = new client_1.PrismaClient();
const getProjects = async (req, res) => {
    // In your projects controller
    const userId = await (0, session_1.getUserIdFromSession)(req);
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
    export const createProject = async (req, res) => {
        const userId = await (0, session_1.getUserIdFromSession)(req);
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
        }
        catch (error) {
            res.status(500).json({ message: `Error creating a project: ${error.message}` });
        }
    };
};
exports.getProjects = getProjects;
