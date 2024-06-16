-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_userId_fkey";

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
