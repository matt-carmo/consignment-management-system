"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsignmentsOrdersRepository = void 0;
const server_1 = require("../server");
class ConsignmentsOrdersRepository {
    async create({ consignmentId }) {
        return server_1.server.prisma.consignmentOrder.create({
            data: {
                consignmentId,
            },
        });
    }
    async pay({ orderId, paidValue, paid, paidAt }) {
        return server_1.server.prisma.consignmentOrder.update({
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
    findAllById({ params }) {
        return server_1.server.prisma.consignmentOrder.findMany({
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
    agregateTotalSoldAndValue({ orderId }) {
        return server_1.server.prisma.consignmentOrderItem.aggregate({
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
    findById({ orderId }) {
        return server_1.server.prisma.consignmentOrder.findUnique({
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
    async delete(orderId) {
        return server_1.server.prisma.consignmentOrder.update({
            where: { id: orderId },
            data: { deletedAt: new Date() },
        });
    }
}
exports.ConsignmentsOrdersRepository = ConsignmentsOrdersRepository;
