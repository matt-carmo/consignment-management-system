import { FastifyInstance } from "fastify";
import { ConsignmentOrderController } from "../controllers/consignment-order.controller";

export function consignmentOrdersRoute(server: FastifyInstance) {
  const controller = new ConsignmentOrderController();
  server.get("/consignment-orders", controller.getOrders.bind(controller));
  server.post("/consignment-order", controller.create.bind(controller));
  server.get(
    "/consignment-order/:orderId",
    controller.getOrderById.bind(controller)
  );
  server.put(
    "/consignment-order/:orderId/pay",
    controller.payOrder.bind(controller)
  );
  server.delete(
    "/consignment-order/:orderId",
    controller.delete.bind(controller)
  );
}
