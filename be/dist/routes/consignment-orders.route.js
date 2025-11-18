"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consignmentOrdersRoute = consignmentOrdersRoute;
const consignment_order_controller_1 = require("../controllers/consignment-order.controller");
function consignmentOrdersRoute(server) {
    const controller = new consignment_order_controller_1.ConsignmentOrderController();
    server.get("/consignment-orders", controller.getOrders.bind(controller));
    server.post("/consignment-order", controller.create.bind(controller));
    server.get("/consignment-order/:orderId", controller.getOrderById.bind(controller));
    server.put("/consignment-order/:orderId/pay", controller.payOrder.bind(controller));
    server.delete("/consignment-order/:orderId", controller.delete.bind(controller));
}
