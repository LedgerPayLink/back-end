/*
  Warnings:

  - You are about to drop the column `chosen` on the `Eoa` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chainId,ownerId,tokenAddress]` on the table `Eoa` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Eoa_chainId_ownerId_key";

-- AlterTable
ALTER TABLE "Eoa" DROP COLUMN "chosen";

-- CreateIndex
CREATE UNIQUE INDEX "Eoa_chainId_ownerId_tokenAddress_key" ON "Eoa"("chainId", "ownerId", "tokenAddress");
