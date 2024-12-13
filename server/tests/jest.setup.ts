import app from '../src/index';
import { PrismaClient } from '@prisma/client';
import { Server } from 'http';

let server: Server;
const prisma = new PrismaClient();

beforeAll(async () => {
  // Start the server
  server = app.listen(process.env.PORT || 8000);

  // Connect Prisma client
  await prisma.$connect();
});

afterAll(async () => {
  // Stop the server
  if (server) {
    server.close();
  }

  // Disconnect Prisma client
  await prisma.$disconnect();
});
