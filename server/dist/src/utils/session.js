"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromSession = getUserIdFromSession;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getUserIdFromSession(req) {
    const sessionToken = req.cookies.session_token;
    if (!sessionToken)
        return undefined;
    const session = await prisma.session.findUnique({
        where: { token: sessionToken },
        include: { user: true }
    });
    if (!session || !session.user)
        return undefined;
    return session.userId;
}
