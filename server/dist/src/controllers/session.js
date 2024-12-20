"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get("/validate-session", async (req, res, next) => {
    try {
        const sessionToken = req.cookies?.session_token;
        if (!sessionToken) {
            return res.status(401).json({ isValid: false });
        }
        const session = await prisma.session.findUnique({
            where: { token: sessionToken },
        });
        if (!session) {
            return res.status(401).json({ isValid: false });
        }
        res.status(200).json({ isValid: true });
    }
    catch (error) {
        console.error("Error validating session:", error);
        next(error); // Pass errors to the error-handling middleware
    }
});
exports.default = router;
