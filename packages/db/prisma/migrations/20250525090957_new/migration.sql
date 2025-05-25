-- DropIndex
DROP INDEX "WalletKey_key_key";

-- AlterTable
ALTER TABLE "WalletKey" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
