"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const server_1 = require("../server");
class ProductRepository {
    async findAll() {
        return server_1.server.prisma.product.findMany();
    }
    async findAllById(productIds) {
        return server_1.server.prisma.product.findMany({
            where: { id: { in: productIds } },
        });
    }
    async create(data) {
        return server_1.server.prisma.product.create({ data });
    }
    async update({ id, data }) {
        return server_1.server.prisma.product.update({
            where: { id: Number(id) },
            data,
        });
    }
    async delete(id) {
        return server_1.server.prisma.product.update({
            where: { id },
            data: {
                deleted: true
            }
        });
    }
}
exports.ProductRepository = ProductRepository;
