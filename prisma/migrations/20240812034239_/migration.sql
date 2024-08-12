-- CreateTable
CREATE TABLE "PurchaseWithoutInvoice" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "vendor" TEXT NOT NULL,
    "grams" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "pricePerCt" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PurchaseWithoutInvoice_pkey" PRIMARY KEY ("id")
);
