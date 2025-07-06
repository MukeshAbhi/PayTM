
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const enginePath = join(
  __dirname,
  "../node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node"
);
const outPath = join(
  __dirname,
  "../.next/server/libquery_engine-rhel-openssl-3.0.x.so.node"
);

if (existsSync(enginePath)) {
  mkdirSync(join(__dirname, "../.next/server"), { recursive: true });
  copyFileSync(enginePath, outPath);
  console.log("✅ Prisma engine copied");
} else {
  console.warn("⚠️ Prisma engine not found at", enginePath);
}
