import { Prisma, PrismaClient } from "@prisma/client";
import { server } from "../server";

export class ConsigmentsRepository {
  create(data: Prisma.ConsignmentCreateInput) {
    return server.prisma.consignment.create({ data });
  }
  public async findAll() {
    return server.prisma.consignment.findMany();
  }
}
