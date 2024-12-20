"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const client_1 = __importDefault(require("@prisma/client")); // Adjust path as needed
const authenticateUser = async (req, res, next) => {
    try {
        const sessionToken = req.cookies?.session_token;
        if (!sessionToken) {
            return res.status(401).json({ message: "Unauthorized: Please sign in." });
        }
        // Check the session in the database
        const session = await client_1.default.session.findUnique({
            where: { token: sessionToken },
            include: { user: true },
        });
        if (!session || !session.user) {
            return res.status(401).json({ message: "Session invalid or expired. Please sign in." });
        }
        // Attach user to req object
        req.user = {
            id: session.user.userId,
            name: session.user.name || "Anonymous",
            profilePictureUrl: session.user.profilePictureUrl || "/assets/anonymous.png",
        };
        next();
    }
    catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.authenticateUser = authenticateUser;
