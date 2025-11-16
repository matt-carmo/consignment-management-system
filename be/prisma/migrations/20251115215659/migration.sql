-- AlterTable
ALTER TABLE "ConsignmentOrder" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ConsignmentOrderItem" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
