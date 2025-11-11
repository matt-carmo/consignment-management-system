-- AlterTable
ALTER TABLE "ConsignmentOrder" ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paidAt" TIMESTAMP(3);
