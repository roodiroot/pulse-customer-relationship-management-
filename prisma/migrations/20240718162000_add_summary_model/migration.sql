-- CreateTable
CREATE TABLE "summary" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT,
    "dealId" TEXT,

    CONSTRAINT "summary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "summary" ADD CONSTRAINT "summary_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
