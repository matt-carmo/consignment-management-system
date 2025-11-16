import { FastifyInstance } from "fastify";
import { ConsignmentOrderItemController } from "../controllers/consignment-order-item.controller";

export function consignmentOrderItemRoute(server: FastifyInstance) {
  const controller = new ConsignmentOrderItemController();
//   server.get(
//     "/consignment-order-item",
//     controller.findAllByConsignmentOrderId.bind(controller)
//   );
  server.post(
    "/consignment-order-item/:orderId",
    controller.create.bind(controller)
  );

  server.put("/consignment-order-item/:id", controller.update.bind(controller));
  server.delete(
    "/consignment-order-item/:id",
    controller.delete.bind(controller)
  );
}
