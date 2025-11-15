import { Prisma } from "@prisma/client";
import { server } from "../server";

export class ProductRepository {
    async findAll() {
        return server.prisma.product.findMany();
    }
    async create(data: Prisma.ProductCreateInput) {
        return server.prisma.product.create({ data });
    }
    async update (data: Prisma.ProductUncheckedUpdateInput) {
        return server.prisma.product.update({where: {id: data.id as number}, data});
    }
}