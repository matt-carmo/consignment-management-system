import { Prisma } from "@prisma/client";
import { server } from "../server";
import { ConsignmentOrderFilters } from "../types/consignment-orders/filters";
import { PayConsignmentOrder } from "../types/consignment-orders/pay";

export class ConsignmentsOrdersRepository {
  public async create({ consignmentId }: { consignmentId: string }) {
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
        deletedAt: null,
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
            phone_number: true,
            createdAt: true,
          },
        },

        _count: {
          select: {
            consignmentOrderItems: {
              where: {
                deletedAt: null,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  public agregateTotalSoldAndValue({ orderId }: { orderId: number }) {
    return server.prisma.consignmentOrderItem.aggregate({
      where: {
        consignmentOrderId: orderId,
        deletedAt: null,
      },
      _sum: {
        quantitySent: true,
        itemPriceSnapshot: true,
      },
    });
  }
  public findById({ orderId }: { orderId: number }) {
    return server.prisma.consignmentOrder.findUnique({
      where: {
        id: orderId,
        deletedAt: null,
      },
      include: {
        consignment: {
            omit: {
                createdAt: true,
                updatedAt: true,
                userId: true,
                deletedAt: true,
                idx: true
            }
        },
        consignmentOrderItems: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }
  public async delete(orderId: number) {
    return server.prisma.consignmentOrder.update({
      where: { id: orderId },
      data: { deletedAt: new Date() },
    });
  }
}
