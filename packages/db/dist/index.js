import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, Prisma, $Enums } from "./generated/client/index.js";
const globalForPrisma = globalThis;
// Lazy initialization to avoid issues during build time
function createPrismaClient() {
    return new PrismaClient({
        log: ["error"], // Only log errors, no queries
    });
}
export const prisma = globalForPrisma.prisma || createPrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
export { Prisma, $Enums };
export const adapter = PrismaAdapter(prisma);
