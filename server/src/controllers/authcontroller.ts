import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { OAuth2Client } from "google-auth-library";



const prisma = new PrismaClient();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "your_google_client_id";

const setSessionCookie = (res: any, token: string) => {
  res.cookie("session_token", token, {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24, // 1 day expiration
  });
};

// Register User
export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password, termsAccepted, username } = req.body;

    if (!name || !username || !email || !password || !termsAccepted) {
      res.status(400).json({ message: "All fields are required." });
    }

    const existingEmailUser = await prisma.user.findUnique({ where: { email } });
    if (existingEmailUser) {
      res.status(400).json({ message: "Email is already in use." });
    }

    const existingUsername = await prisma.user.findFirst({ where: { username } });
    if (existingUsername) {
      res.status(400).json({ message: "Username already taken." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        termsAccepted: true,
      },
    });

    const sessionToken = uuidv4();
    await prisma.session.create({
      data: { token: sessionToken, userId: newUser.userId },
    });

    setSessionCookie(res, sessionToken);

    res.status(201).json({
      message: "Registration successful!",
      user: {
        id: newUser.userId,
        email: newUser.email,
        username: newUser.username,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Sign In with Email and Password
export const signInUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const sessionToken = uuidv4();
    await prisma.session.create({
      data: { token: sessionToken, userId: user.userId },
    });

    setSessionCookie(res, sessionToken);

    res.status(200).json({
      message: "Sign-in successful",
      user: {
        id: user.userId,
        email: user.email,
        username: user.username,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error signing in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Sign In with Google
export const googleSignIn: RequestHandler = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      res.status(400).json({ message: "idToken is required" });
      return;
    }

    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      res.status(400).json({ message: "Invalid Google token" });
      return;
    }

    const { email, sub: googleId, name: fullName } = payload;
    const username = email.split("@")[0]; // Derive username from email prefix

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          googleId,
          username, // Set derived username
          name: fullName || null, // Use Google's full name if available
          termsAccepted: true, // Assume Google users accept terms by default
        },
      });
    }

    const sessionToken = uuidv4();
    await prisma.session.create({
      data: { token: sessionToken, userId: user.userId },
    });

    setSessionCookie(res, sessionToken);

    res.status(200).json({
      message: "Google sign-in successful",
      user: {
        id: user.userId,
        email: user.email,
        username: user.username,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const verifySession: RequestHandler = async (req, res) => {
  const sessionToken = req.cookies.session_token;
  if (!sessionToken) {
    res.status(401).json({ message: 'No session token provided' });
    return;
  }

const session = await prisma.session.findUnique({
  where: { token: sessionToken },
});
  if (!session || !session.token) {
    res.status(401).json({ message: 'Invalid or expired session' });
    return;
  }

  res.status(200).json({ message: 'Session valid', userId: session.userId });
};

// Sign Out
export const signOut: RequestHandler = async (req, res) => {
  try {
    const sessionToken = req.cookies.session_token;
    if (sessionToken) {
      await prisma.session.deleteMany({ where: { token: sessionToken } });
      res.clearCookie("session_token");
    }
    res.status(200).json({ message: "Signed out successfully" });
  } catch (error) {
    console.error("Error signing out:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserDetails: RequestHandler = async (req, res) => {
  const sessionToken = req.cookies.session_token;
  if (!sessionToken) {
    res.status(401).json({ message: "No session token provided" });
    return; // Ensure the function ends after sending the response
  }

  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true },
  });

  if (!session || !session.user) {
    res.status(401).json({ message: "Invalid or expired session" });
    return;
  }

  const { user } = session;
  res.status(200).json({
    user: {
      userId: user.userId,
      username: user.username,
      email: user.email,
      profilePictureUrl: user.profilePictureUrl,
      googleId: user.googleId,
      teamId: user.teamId,
      termsAccepted: user.termsAccepted,
    },
  });
  return; // Ends the handler without returning a Response object
};