-- CreateTable
CREATE TABLE "Casting" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "caster" TEXT NOT NULL,
    "goldSilver" TEXT NOT NULL,
    "castingWeight" TEXT NOT NULL,
    "pureWeight" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Casting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edit" (
    "id" TEXT NOT NULL,
    "stepType" TEXT NOT NULL,
    "weightBefore" TEXT NOT NULL,
    "weightAfter" TEXT NOT NULL,
    "polishGuy" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Edit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diamond" (
    "id" TEXT NOT NULL,
    "setterName" TEXT NOT NULL,
    "beforeWeight" TEXT NOT NULL,
    "afterWeight" TEXT NOT NULL,
    "diamondWeight" TEXT NOT NULL,
    "diamondQuality" TEXT NOT NULL,
    "settingDustWeight" TEXT NOT NULL,
    "totalLoss" TEXT NOT NULL,
    "totalNumberDiamondSet" TEXT NOT NULL,
    "totalCt" TEXT NOT NULL,
    "returnCt" TEXT NOT NULL,
    "brokenDiamondNumber" TEXT NOT NULL,
    "brokenDiamondCt" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Diamond_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Casting" ADD CONSTRAINT "Casting_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edit" ADD CONSTRAINT "Edit_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diamond" ADD CONSTRAINT "Diamond_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
