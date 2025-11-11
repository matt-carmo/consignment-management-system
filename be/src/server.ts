import fastify, { FastifyRequest } from "fastify";
import prismaPlugin from "./plugins/prisma";
import { ConsigmentsController } from "./controllers/consigments.controller";
import { ConsigmentsOrdersService } from "./services/consigments-orders.service";
import { ConsigmentsOrdersRepository } from "./repositories/consigments-orders.repository";
import { ERRORS } from "./errors/app.errors";
import { Prisma } from "@prisma/client";

export const server = fastify();
export function buildServer() {
  server.register(prismaPlugin);

  server.decorate(
    "consigmentsOrdersService",
    new ConsigmentsOrdersService(new ConsigmentsOrdersRepository())
  );

  server.setErrorHandler((error, req, reply) => {
    switch (error.message) {
      case ERRORS.CONSIGMENTS_NOT_FOUND:
        return reply
          .status(404)
          .send({ message: "Consignados não encontrados" });
      case ERRORS.CONSIGNMENT_ALREADY_EXISTS:
        return reply.status(409).send({ message: "Consignado já cadastrado" });
    }

    return reply.status(500).send({ message: "Erro interno no servidor" });
  });

  server.get("/consignments", async (request, reply) => {
    const consigments = new ConsigmentsController();
    return consigments.getAll(request, reply);
  });
  server.post(
    "/consignment",
    async (
      request: FastifyRequest<{
        user: { id: string };
        Body: Prisma.ConsignmentCreateInput & { userId: string };
      }>,
      reply
    ) => {
      const consigment = new ConsigmentsController();
      return consigment.create(request, reply);
    }
  );
  server.get(
    "/consignment/:consignmentId/orders",
    async (
      request: FastifyRequest<{ Params: { consignmentId: string } }>,
      reply
    ) => {
      return await request.server.consigmentsOrdersService.findAllById({
        consignmentId: request.params.consignmentId,
      });
    }
  );

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
