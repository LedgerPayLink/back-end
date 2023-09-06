-- CreateTable
CREATE TABLE "PayLink" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "priceAmount" INTEGER NOT NULL,
    "fiatCurrency" TEXT NOT NULL,
    "destinationChainId" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "PayLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PayLink" ADD CONSTRAINT "PayLink_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
