"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = exports.getUser = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving users: ${error.message}` });
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    const { cognitoId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                cognitoId: cognitoId,
            },
        });
        res.json(user);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving user: ${error.message}` });
    }
};
exports.getUser = getUser;
const postUser = async (req, res) => {
    try {
        const { username, cognitoId, profilePictureUrl = "", teamId = 0, } = req.body;
        const newUser = await prisma.user.create({
            data: {
                username,
                cognitoId,
                profilePictureUrl,
                teamId,
            },
        });
        res.json({ message: "User Created Successfully", newUser });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving users: ${error.message}` });
    }
};
exports.postUser = postUser;
