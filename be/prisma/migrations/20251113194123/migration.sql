/*
  Warnings:

  - Added the required column `itemNameSnapshot` to the `ConsignmentOrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemPriceSnapshot` to the `ConsignmentOrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ConsignmentOrderItem" ADD COLUMN     "itemNameSnapshot" TEXT NOT NULL,
ADD COLUMN     "itemPriceSnapshot" DECIMAL(10,2) NOT NULL;
