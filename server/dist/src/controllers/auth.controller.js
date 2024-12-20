"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignIn = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const paseto_1 = require("paseto");
const google_auth_library_1 = require("google-auth-library");
const prisma = new client_1.PrismaClient();
const googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const PASETO_SECRET_KEY = process.env.PASETO_SECRET_KEY || "your_paseto_secret_key";
// Generate PASETO Token
const generateToken = async (userId) => {
    return await paseto_1.V4.sign({ userId, issuedAt: Date.now() }, PASETO_SECRET_KEY, {
        expiresIn: "7d",
    });
};
// Register User
const registerUser = async (req, res) => {
    const { username, email, password, profilePictureUrl, termsAccepted } = req.body;
    if (!termsAccepted) {
        return res.status(400).json({ message: "You must accept the terms and conditions." });
    }
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                profilePictureUrl,
                termsAccepted,
            },
        });
        const token = await generateToken(user.userId);
        res
            .status(201)
            .cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" })
            .json({ message: "User registered successfully.", user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user." });
    }
};
exports.registerUser = registerUser;
// Google Sign-In
const googleSignIn = async (req, res) => {
    const { idToken } = req.body;
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ message: "Invalid token payload" });
        }
        const { email, name, picture, sub } = payload;
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    username: name,
                    profilePictureUrl: picture,
                    googleId: sub,
                    termsAccepted: true,
                },
            });
        }
        const token = await generateToken(user.userId);
        res
            .status(200)
            .cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" })
            .json({ token, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error with Google Sign-In." });
    }
};
exports.googleSignIn = googleSignIn;
