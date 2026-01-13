import { PrismaClient } from "@prisma/client";

// Ensure we reuse the PrismaClient instance in development
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { prisma };