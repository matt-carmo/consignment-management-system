import { server } from "../server";


export class ConsigmentsOrdersRepository {
  public findAllById({ consignmentId }: { consignmentId: string }) {
    return server.prisma.consignmentOrder.findMany({
      where: {
        consignmentId,
      },
      include: {
        consignmentOrderItems: true,
      },
    });
  }
}
