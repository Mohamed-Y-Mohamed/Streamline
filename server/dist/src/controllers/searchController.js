"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const client_1 = require("@prisma/client");
const session_1 = require("../utils/session");
const prisma = new client_1.PrismaClient();
const search = async (req, res) => {
    const userId = await (0, session_1.getUserIdFromSession)(req);
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { query } = req.query;
    const searchQuery = query || "";
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
    }
    catch (error) {
        res.status(500).json({ message: `Error performing search: ${error.message}` });
    }
};
exports.search = search;
