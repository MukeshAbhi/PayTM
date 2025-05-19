/*
  Warnings:

  - Added the required column `type` to the `OnRampTranscation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TranscationType" AS ENUM ('Credit', 'Debit');

-- AlterTable
ALTER TABLE "OnRampTranscation" ADD COLUMN     "type" "TranscationType" NOT NULL;

-- CreateTable
CREATE TABLE "WalletTranscation" (
    "id" TEXT NOT NULL,
    "status" "OnRampStatus" NOT NULL,
    "type" "TranscationType" NOT NULL,
    "token" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WalletTranscation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WalletTranscation_token_key" ON "WalletTranscation"("token");

-- AddForeignKey
ALTER TABLE "WalletTranscation" ADD CONSTRAINT "WalletTranscation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
