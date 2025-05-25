/*
  Warnings:

  - The primary key for the `WalletKey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `WalletKey` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `WalletKey` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WalletKey` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "WalletKey_userId_key";

-- AlterTable
ALTER TABLE "WalletKey" DROP CONSTRAINT "WalletKey_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "userId";
