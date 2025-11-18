"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsignmentRepository = void 0;
const server_1 = require("../server");
class ConsignmentRepository {
    async create(data) {
        return server_1.server.prisma.consignment.create({ data });
    }
    async update({ id, data }) {
        return server_1.server.prisma.consignment.update({
            data,
            where: {
                id
            }
        });
    }
    async delete(id) {
        return server_1.server.prisma.consignment.update({
            where: { id },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async findById(id) {
        return server_1.server.prisma.consignment.findUnique({
            where: {
                id,
                deletedAt: null
            }
        });
    }
    async findAll() {
        return server_1.server.prisma.consignment.findMany({
            where: {
                deletedAt: null
            },
            orderBy: {
                idx: 'asc'
            },
            select: {
                id: true,
                name: true,
                phone_number: true,
            }
        });
    }
}
exports.ConsignmentRepository = ConsignmentRepository;
