echo "🔧 Running Prisma generate..."
echo "👀 PRISMA_CLI_BINARY_TARGETS = $PRISMA_CLI_BINARY_TARGETS"
pnpm db:generate

echo "📦 Trying to copy the Prisma query engine for rhel-openssl-3.0.x..."
ENGINE_PATH="node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node"
DEST_PATH="src/generated/prisma"

if [ -f "$ENGINE_PATH" ]; then
  cp "$ENGINE_PATH" "$DEST_PATH"
  echo "✅ Engine copied to $DEST_PATH"
else
  echo "⚠️ Engine binary not found at $ENGINE_PATH — skipping copy."
  echo "👉 Make sure 'PRISMA_CLI_BINARY_TARGETS' is set in your Vercel environment."
fi
