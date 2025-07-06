echo "🔧 Running Prisma generate..."
echo "👀 PRISMA_CLI_BINARY_TARGETS = $PRISMA_CLI_BINARY_TARGETS"
pnpm db:generate

echo "📦 Trying to copy the Prisma query engine for rhel-openssl-3.0.x..."

cp -r node_modules/.prisma/client node_modules/@prisma/client/
