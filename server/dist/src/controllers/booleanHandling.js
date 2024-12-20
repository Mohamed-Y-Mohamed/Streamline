"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignIn = void 0;
const googleSignIn = async (req, res) => {
    const { idToken } = req.body;
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ message: "Invalid Google token." });
        }
        const email = payload.email || "";
        const name = payload.name || "Google User";
        const picture = payload.picture || "";
        const sub = payload.sub || "";
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    username: name,
                    profilePictureUrl: picture,
                    googleId: sub,
                    termsAccepted: true, // Default to true for Google users
                },
            });
        }
        const token = await generatePasetoToken(user.userId);
        res
            .status(200)
            .cookie("session", token, { httpOnly: true, secure: true, sameSite: "strict" })
            .json({ message: "Google Sign-In successful!", user });
    }
    catch (error) {
        res.status(500).json({ message: "Error during Google Sign-In.", error });
    }
};
exports.googleSignIn = googleSignIn;
