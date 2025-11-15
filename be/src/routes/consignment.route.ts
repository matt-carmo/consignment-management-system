import { server } from "../server";
import { ConsignmentsController } from "../controllers/consignment.controller";

export default async function consignmentsRoute() {
  const consignmentsController = new ConsignmentsController();
  server.get(
    "/consignments",
    consignmentsController.getAll.bind(consignmentsController)
  );
  server.post(
    "/consignment",
    consignmentsController.create.bind(consignmentsController)
  );
}
