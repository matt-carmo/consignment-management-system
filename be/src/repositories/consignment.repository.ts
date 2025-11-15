import { Prisma, PrismaClient } from "@prisma/client";
import { server } from "../server";

export class ConsignmentsRepository {
  public async create(data: Prisma.ConsignmentCreateInput) {
    return server.prisma.consignment.create({ data });
  }
  public async update({id, data}: {id:string, data: Prisma.ConsignmentUpdateInput}) {
    return server.prisma.consignment.update({
      data,
      where: {
        id
      }
    });
  }
  public async delete(id: string) {
    return server.prisma.consignment.update({
      where: { id },
      data: {
        deletedAt: new Date()
      }
    })
  }
  public async findAll() {
    return server.prisma.consignment.findMany({
      where: {
        deletedAt: null 
      }
    });
  }
}
