import { PrismaClient } from './../generated/prisma';
import { PrismaAdapter } from "@auth/prisma-adapter";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prisma = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const adapter = PrismaAdapter(prisma);