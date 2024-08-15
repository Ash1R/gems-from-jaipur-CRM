/*
  Warnings:

  - Added the required column `goldRate` to the `Casting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diamondCost` to the `Diamond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `Edit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Casting" ADD COLUMN     "goldRate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Diamond" ADD COLUMN     "diamondCost" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Edit" ADD COLUMN     "cost" TEXT NOT NULL;
