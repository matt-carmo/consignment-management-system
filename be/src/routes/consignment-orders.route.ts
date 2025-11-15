import { FastifyInstance } from "fastify";
import { ConsignmentOrdersController } from "../controllers/consignment-orders.controller";

export function consignmentOrdersRoute(server: FastifyInstance) {
  const controller = new ConsignmentOrdersController();
  server.get(
    "/consignment-orders",
    controller.getOrders.bind(controller)
  );
  server.get(
    "/consignment-order/:orderId",
    controller.getOrderById.bind(controller)
  );
}
