/*
  Warnings:

  - A unique constraint covering the columns `[chainId,ownerId]` on the table `Eoa` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Eoa_chainId_symbol_address_ownerId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Eoa_chainId_ownerId_key" ON "Eoa"("chainId", "ownerId");
