import { ERRORS } from "../errors/app.errors";
import { ConsignmentsOrdersRepository } from "../repositories/consignment-order.repository";
import { ConsignmentOrderFilters } from "../types/consignment-orders/filters";
import { PayConsignmentOrder } from "../types/consignment-orders/pay";


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

    return consignmentsOrders;
  }
  public async findById({ orderId }: { orderId: number }) {
    const order = await this.repository.findById({ orderId });
    if (!order) {
      throw new Error(ERRORS.CONSIGNMENT_NOT_FOUND);
    }
    const totalValue = order?.consignmentOrderItems.reduce((acc, item: any) => {
      const price = Number(item.itemPriceSnapshot);
      const quantity = Number(item.quantitySent);
      return acc + price * quantity;
    }, 0);
    const totalValueReturn = order?.consignmentOrderItems.reduce((acc, item: any) => {
      const price = Number(item.itemPriceSnapshot);
      const quantity = Number(item.quantityReturned);
      return acc + price * quantity;
    }, 0);

    return {
      order,
      totalValue,
      totalValueReturn,
    };

  }

  public async pay({
    orderId,
    paid,
    paidAt,
  }: Omit<PayConsignmentOrder, "paidValue">) {
    const consignmentOrder = await this.repository.findById({ orderId });
    if (!consignmentOrder) {
      throw new Error(ERRORS.CONSIGNMENT_NOT_FOUND);
    }
    const paidValue = consignmentOrder.consignmentOrderItems.reduce((acc, item: any) => {
      const price = Number(item.itemPriceSnapshot);
      const quantitySent = Number(item.quantitySent);
      const quantity = quantitySent - (item.quantityReturned || 0);
      return acc + price * quantity;
    }, 0);

    if (!paid) {
      return this.repository.pay({ orderId, paid, paidAt: null, paidValue: 0 });
    }
    return this.repository.pay({ orderId, paid, paidAt, paidValue });
  }

  public async create({ consignmentId }: { consignmentId: string }) {
    if (!consignmentId) {
      throw new Error(ERRORS.CONSIGNMENT_NOT_FOUND);
    }

    return this.repository.create({ consignmentId });
  }
  public async delete({ orderId }: { orderId: number }) {
    return this.repository.delete(orderId);
  }
}
