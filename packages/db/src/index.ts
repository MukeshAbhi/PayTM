import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, Prisma, $Enums } from "./generated/prisma/index.js";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Lazy initialization to avoid issues during build time
function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { Prisma, $Enums };
export const adapter: any = PrismaAdapter(prisma);
