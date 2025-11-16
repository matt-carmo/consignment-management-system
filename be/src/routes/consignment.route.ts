import { server } from "../server";
import { ConsignmentsController } from "../controllers/consignment.controller";

export default async function consignmentRoute() {
  const consignmentsController = new ConsignmentsController();
  server.get(
    "/consignments",
    consignmentsController.getAll.bind(consignmentsController)
  );
  server.get(
    "/consignment/:id",
    consignmentsController.getOne.bind(consignmentsController)
  );
  server.post(
    "/consignment",
    consignmentsController.create.bind(consignmentsController)
  );
  server.put(
    "/consignment/:id",
    consignmentsController.update.bind(consignmentsController)
  );
  server.delete(
    "/consignment/:id",
    consignmentsController.delete.bind(consignmentsController)
  );
}
