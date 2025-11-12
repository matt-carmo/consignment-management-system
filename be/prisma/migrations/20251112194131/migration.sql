/*
  Warnings:

  - You are about to drop the column `quantity` on the `ConsignmentOrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ConsignmentOrder" ADD COLUMN     "totalValue" DECIMAL(10,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ConsignmentOrderItem" DROP COLUMN "quantity",
ADD COLUMN     "quantityReturned" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantitySent" INTEGER NOT NULL DEFAULT 0;
