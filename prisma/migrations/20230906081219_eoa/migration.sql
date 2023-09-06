/*
  Warnings:

  - A unique constraint covering the columns `[chainId,symbol,address,ownerId]` on the table `Eoa` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nativeToken` on table `Eoa` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Eoa_chainId_symbol_address_key";

-- AlterTable
ALTER TABLE "Eoa" ALTER COLUMN "nativeToken" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Eoa_chainId_symbol_address_ownerId_key" ON "Eoa"("chainId", "symbol", "address", "ownerId");
