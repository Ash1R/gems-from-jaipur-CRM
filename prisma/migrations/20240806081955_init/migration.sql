-- CreateTable
CREATE TABLE "MetalPurchase" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "metalType" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "grams" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "paid" TEXT NOT NULL,

    CONSTRAINT "MetalPurchase_pkey" PRIMARY KEY ("id")
);
