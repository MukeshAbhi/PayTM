/*
  Warnings:

  - You are about to drop the column `status` on the `WalletTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `WalletTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WalletTransaction` table. All the data in the column will be lost.
  - Added the required column `fromUserId` to the `WalletTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `WalletTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WalletTransaction" DROP CONSTRAINT "WalletTransaction_userId_fkey";

-- AlterTable
ALTER TABLE "WalletTransaction" DROP COLUMN "status",
DROP COLUMN "type",
DROP COLUMN "userId",
ADD COLUMN     "fromUserId" TEXT NOT NULL,
ADD COLUMN     "toUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
