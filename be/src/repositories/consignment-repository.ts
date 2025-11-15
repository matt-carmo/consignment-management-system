import { Prisma, PrismaClient } from "@prisma/client";
import { server } from "../server";

export class ConsignmentsRepository {
  public async create(data: Prisma.ConsignmentCreateInput) {
    console.log(data)
    return server.prisma.consignment.create({ data });
  }
  public async findAll() {
    return server.prisma.consignment.findMany();
  }
}
