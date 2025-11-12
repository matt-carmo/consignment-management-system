import { FastifyInstance } from "fastify";
import { ConsignmentsController } from "../controllers/consignments.controller";
import { ConsignmentOrdersController } from "../controllers/consignment-orders.controller";

export function consignmentOrdersRoute(server: FastifyInstance) {
  const controller = new ConsignmentOrdersController();
  server.get(
    "/consignment/:consignmentId/orders",
    controller.getConsignmentsOrdersById.bind(controller)
  );
  server.get(
    "/consignment-order/:orderId",
    controller.getConsignmentOrderById.bind(controller)
  );
}
