/*
  Warnings:

  - You are about to drop the column `walletPin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "walletPin";

-- CreateTable
CREATE TABLE "WalletKey" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "WalletKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WalletKey_userId_key" ON "WalletKey"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WalletKey_key_key" ON "WalletKey"("key");

-- AddForeignKey
ALTER TABLE "WalletKey" ADD CONSTRAINT "WalletKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
