import { Prisma } from "@prisma/client";
import { server } from "../server";
import { ConsignmentOrderFilters } from "../types/consignment-orders/filters";
import { PayConsignmentOrder } from "../types/consignment-orders/pay";

export class ConsignmentsOrdersRepository {
  public async create({consignmentId}: {consignmentId: string}) {

    return server.prisma.consignmentOrder.create({
      data: {
        consignmentId,
      },
    });
  }
  public async pay({ orderId, paidValue, paid, paidAt }: PayConsignmentOrder) {
    return server.prisma.consignmentOrder.update({
      where: {
        id: orderId,
      },
      data: {
        paid,
        paidValue,
        paidAt,
      },
    });
  }
  public findAllById({ params }: { params: ConsignmentOrderFilters }) {
    return server.prisma.consignmentOrder.findMany({
      where: {
        consignmentId: params.consignmentId,
        paid: params.paid,
        createdAt: params.createdAt,
      },
      select: {
        id: true,
        consignmentId: true,
        createdAt: true,
        paid: true,
        paidValue: true,
        paidAt: true,

        consignment: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },

        consignmentOrderItems: {
          select: {
            id: true,
            quantitySent: true,
            itemPriceSnapshot: true,
            quantityReturned: true,
          },
        },
      },
    });
  }
  public findById({ orderId }: { orderId: number }) {
    return server.prisma.consignmentOrderItem.findMany({
      where: {
        consignmentOrderId: orderId,
      },
    });
  }
}
