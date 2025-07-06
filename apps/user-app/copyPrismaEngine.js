import { existsSync, mkdirSync, copyFileSync } from "fs";
import { join } from "path";

const source = join(
  __dirname,
  "../../node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node"
);

const destination = join(
  __dirname,
  "../.next/server/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node"
);

if (!existsSync(source)) {
  console.error("❌ Prisma engine binary not found at:", source);
  process.exit(1);
}

mkdirSync(join(destination, ".."), { recursive: true });
copyFileSync(source, destination);
console.log("✅ Copied Prisma query engine to Next.js runtime output");
