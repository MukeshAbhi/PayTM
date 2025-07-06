echo "🔧 Running Prisma generate..."
echo "👀 PRISMA_CLI_BINARY_TARGETS = $PRISMA_CLI_BINARY_TARGETS"

# Generate Prisma Client
pnpm db:generate

# Get the expected binary path for the deployed runtime
PRISMA_BINARY_TARGET=${PRISMA_CLI_BINARY_TARGETS:-rhel-openssl-3.0.x}
PRISMA_ENGINE_SOURCE_PATH="./node_modules/@prisma/engines/query-engine-${PRISMA_BINARY_TARGET}.so.node"
PRISMA_ENGINE_DEST_PATH="./src/generated/prisma/libquery_engine-${PRISMA_BINARY_TARGET}.so.node"

# Copy the correct engine binary
echo "📦 Copying Prisma query engine to: $PRISMA_ENGINE_DEST_PATH"
mkdir -p ./src/generated/prisma
cp "$PRISMA_ENGINE_SOURCE_PATH" "$PRISMA_ENGINE_DEST_PATH" || echo "❌ Failed to copy Prisma engine binary"

