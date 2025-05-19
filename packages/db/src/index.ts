import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, Prisma, $Enums } from "./generated/prisma/index.js";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export {Prisma, $Enums};
export const adapter: any = PrismaAdapter(prisma);
