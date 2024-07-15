/*
  Warnings:

  - The `contractPrice` column on the `deal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "deal" DROP COLUMN "contractPrice",
ADD COLUMN     "contractPrice" INTEGER;
