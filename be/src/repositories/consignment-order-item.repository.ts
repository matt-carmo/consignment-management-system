import { Prisma } from "@prisma/client";
import { server } from "../server";

export class ConsignmentOrderItemRepository {
  create(data: Prisma.ConsignmentOrderItemCreateInput) {
    return server.prisma.consignmentOrderItem.create({ data });
  }
  createMany(data: Prisma.ConsignmentOrderItemCreateManyInput[]) {
    return server.prisma.consignmentOrderItem.createMany({
      data,
    });
  }
  async updateMany({
    items,
  }: {
    items: Prisma.ConsignmentOrderItemUncheckedUpdateInput[];
  }) {
    // return console.log(items);
    try {
      const result = await server.prisma.$transaction(
        items.map((item) =>
          server.prisma.consignmentOrderItem.update({
            where: {
              id: item.id as number,
            },
            data: {
              quantityReturned: item.quantityReturned,
              quantitySent: item.quantitySent,
            },
          })
        )
      );
      console.log("Result of updateMany:", result);
      return result;
    } catch (error) {
      console.error("Error in updateMany:", error);
    }
  }
  update({
    id,
    data,
  }: {
    id: string;
    data: Prisma.ConsignmentOrderItemUncheckedUpdateInput;
  }) {
    return server.prisma.consignmentOrderItem.update({
      where: { id: Number(id) },
      data,
    });
  }
  delete(id: number) {
    return server.prisma.consignmentOrderItem.delete({
      where: { id },
    });
  }
  constructor() {}
}
