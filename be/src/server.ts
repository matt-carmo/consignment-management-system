import fastify, { FastifyRequest } from "fastify";
import prismaPlugin from "./plugins/prisma";

import { ConsignmentsOrdersRepository } from "./repositories/consignment-orders.repository";
import { ERRORS } from "./errors/app.errors";
import { Prisma } from "@prisma/client";
import consignmentsRoute from "./routes/consignments.route";
import { consignmentOrdersRoute } from "./routes/consignment-orders.route";
import { ConsignmentOrdersService } from "./services/consignment-orders.service";

export const server = fastify();
import cors from "@fastify/cors";
export function buildServer() {
  server.register(prismaPlugin);
   server.register(cors, {
    origin: true,

})
  server.decorate(
    "consignmentsOrdersService",
    new ConsignmentOrdersService(new ConsignmentsOrdersRepository())
  );

  server.setErrorHandler((error, req, reply) => {
    switch (error.message) {
      case ERRORS.CONSIGNMENTS_NOT_FOUND:
        return reply
          .status(200).send({ message: "Consignados não encontrados", data: [] });
      case ERRORS.CONSIGNMENT_ALREADY_EXISTS:
        return reply.status(409).send({ message: "Consignado já cadastrado" });
    }

    return reply.status(500).send({ message: "Erro interno no servidor", error });
  });

  server.register(consignmentsRoute);
  server.register(consignmentOrdersRoute);  


  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });

  return server;
}
buildServer();
