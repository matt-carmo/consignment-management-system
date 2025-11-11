/*
  Warnings:

  - Added the required column `itemPrice` to the `ConsignmentOrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `ConsignmentOrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ConsignmentOrderItem" ADD COLUMN     "itemPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "totalPrice" DECIMAL(10,2) NOT NULL;
