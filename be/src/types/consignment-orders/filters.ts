import { Prisma } from "@prisma/client";

export type ConsignmentOrderFilters = Pick<
  Prisma.ConsignmentOrderWhereInput,
  "consignmentId" | "paid" | "createdAt"
>;