-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_eventId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "eventId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "SaleEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
