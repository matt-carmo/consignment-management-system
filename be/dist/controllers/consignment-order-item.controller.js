"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsignmentOrderItemController = void 0;
const consignment_order_item_repository_1 = require("../repositories/consignment-order-item.repository");
const consignment_order_item_service_1 = require("../services/consignment-order-item.service");
class ConsignmentOrderItemController {
    service = new consignment_order_item_service_1.ConsignmentOrderItemService(new consignment_order_item_repository_1.ConsignmentOrderItemRepository());
    async create(req, res) {
        const { body } = req;
        const { orderId } = req.params;
        const consignmentOrderItems = await this.service.createMany({ body, orderId });
        return res.status(201).send({ message: "Itens criados com sucesso", data: consignmentOrderItems });
    }
    async update(req, res) {
        const consignmentOrderItem = await this.service.update({
            id: req.params.id,
            data: req.body,
        });
        return res.send(consignmentOrderItem);
    }
    //   async findAllByConsignmentOrderId(
    //     req: FastifyRequest<{ Params: { id: string } }>,
    //     res: FastifyReply
    //   ) {
    //     const consignmentOrderItems =
    //       await this.service.findAllByConsignmentOrderId({
    //         consignmentOrderId: Number(req.params.id),
    //       });
    //     return res.send(consignmentOrderItems);
    //   }
    async delete(req, res) {
        await this.service.delete(Number(req.params.id));
        return res.status(204).send();
    }
}
exports.ConsignmentOrderItemController = ConsignmentOrderItemController;
