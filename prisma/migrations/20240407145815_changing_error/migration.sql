/*
  Warnings:

  - You are about to drop the `Stage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_stageId_fkey";

-- DropTable
DROP TABLE "Stage";

-- CreateTable
CREATE TABLE "stage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "stage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
