"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsignmentOrderItemRepository = void 0;
const server_1 = require("../server");
class ConsignmentOrderItemRepository {
    create(data) {
        return server_1.server.prisma.consignmentOrderItem.create({ data });
    }
    createMany(data) {
        return server_1.server.prisma.consignmentOrderItem.createMany({
            data,
        });
    }
    async updateMany({ items, }) {
        // return console.log(items);
        try {
            const result = await server_1.server.prisma.$transaction(items.map((item) => server_1.server.prisma.consignmentOrderItem.update({
                where: {
                    id: item.id,
                },
                data: {
                    quantityReturned: item.quantityReturned,
                    quantitySent: item.quantitySent,
                },
            })));
            console.log("Result of updateMany:", result);
            return result;
        }
        catch (error) {
            console.error("Error in updateMany:", error);
        }
    }
    update({ id, data, }) {
        return server_1.server.prisma.consignmentOrderItem.update({
            where: { id: Number(id) },
            data,
        });
    }
    delete(id) {
        return server_1.server.prisma.consignmentOrderItem.delete({
            where: { id },
        });
    }
    constructor() { }
}
exports.ConsignmentOrderItemRepository = ConsignmentOrderItemRepository;
