-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_userId_fkey";

-- AlterTable
ALTER TABLE "case" ALTER COLUMN "dealId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "contact" ALTER COLUMN "companyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "deal" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
