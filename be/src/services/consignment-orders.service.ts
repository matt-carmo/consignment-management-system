import { Prisma } from "@prisma/client";
import { ERRORS } from "../errors/app.errors";
import { ConsignmentsOrdersRepository } from "../repositories/consignment-orders.repository";
import { ConsignmentOrderFilters } from "../types/consignment-orders/filters";

export class ConsignmentOrdersService {
  constructor(private repository: ConsignmentsOrdersRepository) {}
  public async findAllByUserId({
    params,
  }: {
    params: ConsignmentOrderFilters;
  }) {
    const consignmentsOrders = await this.repository.findAllById({ params });

    if (!consignmentsOrders.length) {
      throw new Error(ERRORS.CONSIGNMENTS_NOT_FOUND);
    }

   const consignmentsOrdersWithQuantity = consignmentsOrders.map(order => {
      const quantitySent = order.consignmentOrderItems.reduce((acc, item) => {
        return acc + Number(item.quantitySent);
      }, 0);
      return {
        ...order,
        quantitySent,
      };
   });
    return consignmentsOrdersWithQuantity;
  }
  public async findById({ orderId }: { orderId: number }) {
    const consignmentOrderItems = await this.repository.findById({ orderId });
    if (!consignmentOrderItems) {
      throw new Error(ERRORS.CONSIGNMENTS_NOT_FOUND);
    }
     const totalValue = consignmentOrderItems.reduce(
       (acc, item) => {
         const price = Number(item.itemPrice);
         const quantity = Number(item.quantitySent);
         return acc + price * quantity;
       },
       0
     );
     const totalValueReturn = consignmentOrderItems.reduce(
       (acc, item) => {
         const price = Number(item.itemPrice);
         const quantity = Number(item.quantityReturned);
         return acc + price * quantity;
       },
       0
     );

    return {
      totalValueReturn,
      totalValue,
      ...consignmentOrderItems,
    };
  }
}
