import { server } from "../server";
import { ConsignmentOrderFilters } from "../types/consignment-orders/filters";

export class ConsignmentsOrdersRepository {
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
