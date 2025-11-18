"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsignmentOrderController = void 0;
const consignment_order_service_1 = require("../services/consignment-order.service");
const consignment_order_repository_1 = require("../repositories/consignment-order.repository");
const consignment_order_item_repository_1 = require("../repositories/consignment-order-item.repository");
const consignment_order_item_service_1 = require("../services/consignment-order-item.service");
class ConsignmentOrderController {
    consignmentsOrdersService;
    consignmentOrderItemsService;
    constructor() {
        this.consignmentsOrdersService = new consignment_order_service_1.ConsignmentOrdersService(new consignment_order_repository_1.ConsignmentsOrdersRepository());
        this.consignmentOrderItemsService = new consignment_order_item_service_1.ConsignmentOrderItemService(new consignment_order_item_repository_1.ConsignmentOrderItemRepository());
    }
    async payOrder(request, reply) {
        const { items } = request.body;
        const { orderId } = request.params;
        const consignmentOrderItems = await this.consignmentOrderItemsService.updateMany({
            items,
        });
        // return reply.send(consignmentOrderItems);
        if (!consignmentOrderItems) {
            return reply
                .status(400)
                .send({ message: "Erro ao atualizar os itens do pedido" });
        }
        const consignmentOrder = await this.consignmentsOrdersService.pay({
            orderId: Number(orderId),
            paid: request.body.paid,
            paidAt: request.body.paidAt,
        });
        return reply.send(consignmentOrder);
    }
    async getOrders(request, reply) {
        const consignmentsOrders = await this.consignmentsOrdersService.findAllByUserId({
            params: request.params,
        });
        return reply.send(consignmentsOrders);
    }
    async create(request, reply) {
        const consignmentOrder = await this.consignmentsOrdersService.create({
            consignmentId: request.body.consignmentId,
        });
        return reply.status(201).send(consignmentOrder);
    }
    async delete(request, reply) {
        await this.consignmentsOrdersService.delete({
            orderId: Number(request.params.orderId),
        });
        return reply.status(204).send();
    }
    async getOrderById(request, reply) {
        const consignmentOrder = await this.consignmentsOrdersService.findById({
            orderId: Number(request.params.orderId),
        });
        return reply.send(consignmentOrder);
    }
}
exports.ConsignmentOrderController = ConsignmentOrderController;
