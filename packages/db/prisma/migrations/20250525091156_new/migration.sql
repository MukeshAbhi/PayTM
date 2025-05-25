/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `WalletKey` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WalletKey_key_key" ON "WalletKey"("key");
