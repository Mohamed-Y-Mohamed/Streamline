import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"; // Import the Prisma client

const prisma = new PrismaClient();

export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve session token from cookies
    const sessionToken = req.cookies?.session_token;

    if (!sessionToken) {
      res.status(401).json({ message: "Unauthorized: Please sign in." });
      return;
    }

    // Validate session and fetch user
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true },
    });

    if (!session || !session.user) {
      res.status(401).json({ message: "Session invalid or user not found." });
      return;
    }

    // Respond with user details (excluding sensitive info)
    const user = session.user;
    res.status(200).json({
      name: user.name || "Anonymous",
      profilePictureUrl: user.profilePictureUrl || "/assets/anonymous.png",
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
