import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { buildServer } from "../server";
import type { FastifyInstance } from "fastify";
import { createTestConsignment, createTestProduct, createTestUser } from "./test-utils";

let app: FastifyInstance;
let consignmentOrderId = "";

 beforeAll(async () => {
    app = buildServer();

    await app.ready();
    
    await createTestUser(app);
    await createTestProduct(app, "cf910abd-487a-492d-a78f-e274bdbb50d1");
    await createTestConsignment(app, "cf910abd-487a-492d-a78f-e274bdbb50d1");

  });
  afterAll(async () => {
    await app.prisma.consignmentOrder.deleteMany();
    await app.prisma.consignment.deleteMany();
    await app.prisma.product.deleteMany();
    await app.prisma.user.deleteMany();

    await app.close();
  });

describe("Consignment Order (HTTP)", () => {
  it("should create a consignment order", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/consignment-order",
      payload: {
        consignmentId: "cf910abd-487a-492d-a78f-e274bdbb50d1",
      },
    });
    const body = response.json();
    consignmentOrderId = body.id;
    expect(response.statusCode).toBe(201);
  });
   it("should paid a consignment order", async () => {
    const response = await app.inject({
      method: "PUT",
      url: `/consignment-order/${consignmentOrderId}/pay`,
      payload: {
        paid: true,
        paidAt: new Date(),

      },
    });
    expect(response.statusCode).toBe(200);
  });
});
