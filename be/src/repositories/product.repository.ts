import { Prisma } from "@prisma/client";
import { server } from "../server";

export class ProductRepository {
  async findAll({userId}: {userId: string}) {
    return server.prisma.product.findMany(
        {
            where: {
                deleted: false,
                userId
            },
            orderBy: {
                name: 'asc'
            }
        }
    );
  }
  async findAllById(productIds: number[]) {
    return server.prisma.product.findMany({
      where: { id: { in: productIds } },
    });
  }

  async create(data: Prisma.ProductCreateInput) {
    return server.prisma.product.create({ data });
  }
  async update({ id, data }: { id: string; data: Prisma.ProductUncheckedUpdateInput }) {
    return server.prisma.product.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id: number) {
    return server.prisma.product.update({
      where: { id },
        data: {
            deleted: true
        }
    });
  }
}
