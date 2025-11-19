import fastify, { FastifyError } from "fastify";
import prismaPlugin from "./plugins/prisma";

import { ERRORS } from "./errors/app.errors";

import consignmentsRoute from "./routes/consignment.route";
import { consignmentOrdersRoute } from "./routes/consignment-orders.route";

export const server = fastify();
import cors from "@fastify/cors";
import productsRoute from "./routes/product.route";
import { consignmentOrderItemRoute } from "./routes/consignment-order-item.route";
import authRoute from "./routes/auth.route";
export function buildServer() {

  server.register(prismaPlugin);

  server.register(cors, {
    origin: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  });

  server.register(require("@fastify/jwt"), {
    secret: "supersecret",
  });

  server.addHook("onRequest", async (request, reply) => {
    try {
      if (request.url !== "/auth/signup" && request.url !== "/auth/login") {
        const payload = await request.jwtVerify();
        console.log(payload);
      }
    } catch (err) {
      console.log(err);
      reply.status(401).send({ message: "Unauthorized" });
    }
  });

  server.setErrorHandler((error: FastifyError, req, reply) => {
    switch (error.message) {
      case ERRORS.CONSIGNMENT_NOT_FOUND:
        return reply.status(404).send({ message: "Consignado não encontrado" });
      case ERRORS.CONSIGNMENTS_NOT_FOUND:
        return reply
          .status(200)
          .send({ message: "Consignados não encontrados", data: [] });
      case ERRORS.CONSIGNMENT_ALREADY_EXISTS:
        return reply.status(409).send({ message: "Consignado já cadastrado" });
    }
    return reply
      .status(500)
      .send({ message: "Erro interno no servidor", error });
  });

  server.register(consignmentsRoute);
  server.register(consignmentOrdersRoute);
  server.register(productsRoute);
  server.register(consignmentOrderItemRoute);
  server.register(authRoute);

  return server;
}
