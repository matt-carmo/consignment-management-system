import { server } from "../server";


export class ConsignmentsOrdersRepository {
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
