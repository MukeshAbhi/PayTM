/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "walletPin" INTEGER;

-- AlterTable
ALTER TABLE "WalletTransaction" ALTER COLUMN "amount" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "User_paymentId_key" ON "User"("paymentId");
