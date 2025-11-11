/*
  Warnings:

  - You are about to drop the column `consignmentItemId` on the `ConsignmentOrderItem` table. All the data in the column will be lost.
  - You are about to drop the `ConsignmentItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ConsignmentItemToConsignmentOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemId` to the `ConsignmentOrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ConsignmentItem" DROP CONSTRAINT "ConsignmentItem_consignmentId_fkey";

-- DropForeignKey
ALTER TABLE "ConsignmentItem" DROP CONSTRAINT "ConsignmentItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "ConsignmentOrder" DROP CONSTRAINT "ConsignmentOrder_consignmentId_fkey";

-- DropForeignKey
ALTER TABLE "ConsignmentOrderItem" DROP CONSTRAINT "ConsignmentOrderItem_consignmentItemId_fkey";

-- DropForeignKey
ALTER TABLE "_ConsignmentItemToConsignmentOrder" DROP CONSTRAINT "_ConsignmentItemToConsignmentOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConsignmentItemToConsignmentOrder" DROP CONSTRAINT "_ConsignmentItemToConsignmentOrder_B_fkey";

-- AlterTable
ALTER TABLE "ConsignmentOrder" ALTER COLUMN "consignmentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ConsignmentOrderItem" DROP COLUMN "consignmentItemId",
ADD COLUMN     "itemId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ConsignmentItem";

-- DropTable
DROP TABLE "_ConsignmentItemToConsignmentOrder";

-- AddForeignKey
ALTER TABLE "ConsignmentOrder" ADD CONSTRAINT "ConsignmentOrder_consignmentId_fkey" FOREIGN KEY ("consignmentId") REFERENCES "Consignment"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignmentOrderItem" ADD CONSTRAINT "ConsignmentOrderItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
