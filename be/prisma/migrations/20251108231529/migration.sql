/*
  Warnings:

  - You are about to drop the column `quantitySold` on the `ConsignmentOrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ConsignmentOrder" ADD COLUMN     "paidValue" DECIMAL(10,2);

-- AlterTable
ALTER TABLE "ConsignmentOrderItem" DROP COLUMN "quantitySold",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;
