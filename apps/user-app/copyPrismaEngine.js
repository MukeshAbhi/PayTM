import {  mkdirSync, copyFileSync } from "fs";
import { join, resolve } from "path";

const binaryTarget = "rhel-openssl-3.0.x";
const src = resolve(
  __dirname,
  "../../packages/db/node_modules/@prisma/engines/query-engine-" + binaryTarget + ".so.node"
);
const destDir = resolve(__dirname, "../src/generated/prisma");
const dest = join(destDir, `libquery_engine-${binaryTarget}.so.node`);

mkdirSync(destDir, { recursive: true });

try {
  copyFileSync(src, dest);
  console.log("✅ Copied Prisma engine:", dest);
} catch (e) {
  console.warn("❌ Failed to copy Prisma engine:", e.message);
}
