
import type { FastifyInstance } from "fastify";
import { buildServer } from "../server";
import { Prisma } from "@prisma/client";

// tests/test-utils.ts
export async function createApp() {
  const app = buildServer();
  await app.ready();
  return app;
}


export async function createTestUser(app: FastifyInstance) {
  return app.prisma.user.create({
    data: {
      id: "cf910abd-487a-492d-a78f-e274bdbb50d1",
      email: "test@example.com",
      password: "123456",
      name: "Tester",
    },
  });
}

export async function createTestProduct(app: FastifyInstance, data: { name: string; price: number; description: string; userId: string }) {
  return app.prisma.product.create({
    data
  });
}

export async function createTestConsignment(app: FastifyInstance, userId: string) {
  return app.prisma.consignment.create({
    data: {
      name: "Consignment Padrão",
      phone_number: "18999999999",
      id: "cf910abd-487a-492d-a78f-e274bdbb50d1",
      userId,
    },
  });
}
export function createTestConsignmentOrder(app: FastifyInstance, consignmentId: string) {
  return app.prisma.consignmentOrder.create({
    data: {
      consignmentId,
    },
  });
}

export function createTestConsignmentOrderItem(app: FastifyInstance, data: Prisma.ConsignmentOrderItemUncheckedCreateInput) {
  return app.prisma.consignmentOrderItem.create({
    data,
  });
}
