/*
  Warnings:

  - You are about to drop the column `consignmentOrderId` on the `ConsignmentItem` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ConsignmentItem` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerUnit` on the `ConsignmentItem` table. All the data in the column will be lost.
  - You are about to drop the column `returnedQuantity` on the `ConsignmentItem` table. All the data in the column will be lost.
  - You are about to drop the `_ConsignmentItemToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phone_number` to the `Consignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consignmentId` to the `ConsignmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ConsignmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ConsignmentItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ConsignmentItem" DROP CONSTRAINT "ConsignmentItem_consignmentOrderId_fkey";

-- DropForeignKey
ALTER TABLE "_ConsignmentItemToProduct" DROP CONSTRAINT "_ConsignmentItemToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConsignmentItemToProduct" DROP CONSTRAINT "_ConsignmentItemToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Consignment" ADD COLUMN     "phone_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ConsignmentItem" DROP COLUMN "consignmentOrderId",
DROP COLUMN "name",
DROP COLUMN "pricePerUnit",
DROP COLUMN "returnedQuantity",
ADD COLUMN     "consignmentId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_ConsignmentItemToProduct";

-- CreateTable
CREATE TABLE "ConsignmentOrderItem" (
    "id" SERIAL NOT NULL,
    "consignmentOrderId" INTEGER NOT NULL,
    "consignmentItemId" INTEGER NOT NULL,
    "quantitySold" INTEGER NOT NULL,

    CONSTRAINT "ConsignmentOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ConsignmentItemToConsignmentOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ConsignmentItemToConsignmentOrder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ConsignmentItemToConsignmentOrder_B_index" ON "_ConsignmentItemToConsignmentOrder"("B");

-- AddForeignKey
ALTER TABLE "ConsignmentOrderItem" ADD CONSTRAINT "ConsignmentOrderItem_consignmentOrderId_fkey" FOREIGN KEY ("consignmentOrderId") REFERENCES "ConsignmentOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignmentOrderItem" ADD CONSTRAINT "ConsignmentOrderItem_consignmentItemId_fkey" FOREIGN KEY ("consignmentItemId") REFERENCES "ConsignmentItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignmentItem" ADD CONSTRAINT "ConsignmentItem_consignmentId_fkey" FOREIGN KEY ("consignmentId") REFERENCES "Consignment"("idx") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignmentItem" ADD CONSTRAINT "ConsignmentItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsignmentItemToConsignmentOrder" ADD CONSTRAINT "_ConsignmentItemToConsignmentOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "ConsignmentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsignmentItemToConsignmentOrder" ADD CONSTRAINT "_ConsignmentItemToConsignmentOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "ConsignmentOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
