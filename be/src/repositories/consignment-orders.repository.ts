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
      include: {
        consignment: true,
        consignmentOrderItems: {
          select: {
            id: true,
            quantitySent: true,
            itemPrice: true,
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
