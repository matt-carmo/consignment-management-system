import { FastifyRequest } from "fastify";

import { server } from "../server";
import { Prisma } from "@prisma/client";
import { ConsignmentsController } from "../controllers/consignments.controller";

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
