/*
  Warnings:

  - You are about to drop the column `totalValue` on the `ConsignmentOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ConsignmentOrder" DROP COLUMN "totalValue",
ADD COLUMN     "paidValue" DECIMAL(10,2);
