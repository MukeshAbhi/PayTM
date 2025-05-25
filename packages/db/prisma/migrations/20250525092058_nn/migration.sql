-- DropForeignKey
ALTER TABLE "WalletKey" DROP CONSTRAINT "WalletKey_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "walletKey" TEXT;
