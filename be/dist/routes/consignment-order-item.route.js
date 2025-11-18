"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consignmentOrderItemRoute = consignmentOrderItemRoute;
const consignment_order_item_controller_1 = require("../controllers/consignment-order-item.controller");
function consignmentOrderItemRoute(server) {
    const controller = new consignment_order_item_controller_1.ConsignmentOrderItemController();
    //   server.get(
    //     "/consignment-order-item",
    //     controller.findAllByConsignmentOrderId.bind(controller)
    //   );
    server.post("/consignment-order-item/:orderId", controller.create.bind(controller));
    server.put("/consignment-order-item/:id", controller.update.bind(controller));
    server.delete("/consignment-order-item/:id", controller.delete.bind(controller));
}
