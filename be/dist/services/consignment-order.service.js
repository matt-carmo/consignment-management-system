"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsignmentOrdersService = void 0;
const app_errors_1 = require("../errors/app.errors");
class ConsignmentOrdersService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async findAllByUserId({ params, }) {
        const consignmentsOrders = await this.repository.findAllById({ params });
        if (!consignmentsOrders.length) {
            throw new Error(app_errors_1.ERRORS.CONSIGNMENTS_NOT_FOUND);
        }
        return consignmentsOrders;
    }
    async findById({ orderId }) {
        const order = await this.repository.findById({ orderId });
        if (!order) {
            throw new Error(app_errors_1.ERRORS.CONSIGNMENT_NOT_FOUND);
        }
        const totalValue = order?.consignmentOrderItems.reduce((acc, item) => {
            const price = Number(item.itemPriceSnapshot);
            const quantity = Number(item.quantitySent);
            return acc + price * quantity;
        }, 0);
        const totalValueReturn = order?.consignmentOrderItems.reduce((acc, item) => {
            const price = Number(item.itemPriceSnapshot);
            const quantity = Number(item.quantityReturned);
            return acc + price * quantity;
        }, 0);
        return {
            order,
            totalValue,
            totalValueReturn,
        };
    }
    async pay({ orderId, paid, paidAt, }) {
        const consignmentOrder = await this.repository.findById({ orderId });
        if (!consignmentOrder) {
            throw new Error(app_errors_1.ERRORS.CONSIGNMENT_NOT_FOUND);
        }
        const paidValue = consignmentOrder.consignmentOrderItems.reduce((acc, item) => {
            const price = Number(item.itemPriceSnapshot);
            const quantitySent = Number(item.quantitySent);
            const quantity = quantitySent - (item.quantityReturned || 0);
            return acc + price * quantity;
        }, 0);
        if (!paid) {
            return this.repository.pay({ orderId, paid, paidAt: null, paidValue: 0 });
        }
        return this.repository.pay({ orderId, paid, paidAt, paidValue });
    }
    async create({ consignmentId }) {
        if (!consignmentId) {
            throw new Error(app_errors_1.ERRORS.CONSIGNMENT_NOT_FOUND);
        }
        return this.repository.create({ consignmentId });
    }
    async delete({ orderId }) {
        return this.repository.delete(orderId);
    }
}
exports.ConsignmentOrdersService = ConsignmentOrdersService;
