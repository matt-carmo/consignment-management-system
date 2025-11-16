import { FastifyInstance } from "fastify";
import { ConsignmentOrdersController } from "../controllers/consignment-order.controller";

export function consignmentOrdersRoute(server: FastifyInstance) {
  const controller = new ConsignmentOrdersController();
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
}
