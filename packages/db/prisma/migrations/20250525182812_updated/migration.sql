/*
  Warnings:

  - You are about to drop the column `startTime` on the `WalletTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `WalletTransaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "WalletTransaction_token_key";

-- AlterTable
ALTER TABLE "WalletTransaction" DROP COLUMN "startTime",
DROP COLUMN "token",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
