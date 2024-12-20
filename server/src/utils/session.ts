// utils/session.ts
import { Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserIdFromSession(req: Request): Promise<number | undefined> {
  const sessionToken = req.cookies.session_token;
  if (!sessionToken) return undefined;

  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true }
  });

  if (!session || !session.user) return undefined;
  return session.userId;
}
