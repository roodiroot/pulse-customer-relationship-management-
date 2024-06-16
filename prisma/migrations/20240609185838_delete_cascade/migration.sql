-- DropForeignKey
ALTER TABLE "case" DROP CONSTRAINT "case_dealId_fkey";

-- AddForeignKey
ALTER TABLE "case" ADD CONSTRAINT "case_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
