/*
  Warnings:

  - You are about to drop the `PurchaseWithoutInvoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PurchaseWithoutInvoice";

-- CreateTable
CREATE TABLE "PurchaseWithoutInvoices" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "vendor" TEXT NOT NULL,
    "grams" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "pricePerCt" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PurchaseWithoutInvoices_pkey" PRIMARY KEY ("id")
);
