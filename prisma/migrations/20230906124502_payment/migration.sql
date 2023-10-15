-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "priceAmount" INTEGER NOT NULL,
    "fiatCurrency" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "tokenAmount" BIGINT NOT NULL,
    "status" TEXT NOT NULL,
    "payLinkId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payLinkId_fkey" FOREIGN KEY ("payLinkId") REFERENCES "PayLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
