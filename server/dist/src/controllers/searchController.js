"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const search = async (req, res) => {
    const { query } = req.query;
    try {
        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    { title: { contains: query } },
                    { description: { contains: query } },
                ],
            },
        });
        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { description: { contains: query } },
                ],
            },
        });
        const users = await prisma.user.findMany({
            where: {
                OR: [{ username: { contains: query } }],
            },
        });
        res.json({ tasks, projects, users });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error performing search: ${error.message}` });
    }
};
exports.search = search;
