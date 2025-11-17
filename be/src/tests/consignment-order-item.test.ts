import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { buildServer } from "../server";
import type { FastifyInstance } from "fastify";
import { createTestConsignment, createTestConsignmentOrder, createTestProduct, createTestUser } from "./test-utils";

let app: FastifyInstance;
let consignmentOrderId: number | null = null;
let productsCreated: any[] = [];
 beforeAll(async () => {
    app = buildServer();

    await app.ready();
    
    await createTestUser(app);
    const products = Array.from({ length: 4 }).map((_, index) => ({
      name: "Test Product " + index,
      price: Math.floor(Math.random() * 8.50) + 2,
      description: "A product for testing purposes",
      userId: "cf910abd-487a-492d-a78f-e274bdbb50d1",
    }));
    
    const createdProducts = await Promise.all(
      products.map((product) => createTestProduct(app, product))
    );
    productsCreated = createdProducts;
    await createTestConsignment(app, "cf910abd-487a-492d-a78f-e274bdbb50d1");
    const consignmentOrder = await createTestConsignmentOrder(app, "cf910abd-487a-492d-a78f-e274bdbb50d1");
    consignmentOrderId = consignmentOrder.id;

  });
  afterAll(async () => {
    await app.prisma.consignmentOrderItem.deleteMany();

    await app.prisma.consignmentOrder.deleteMany();
    await app.prisma.consignment.deleteMany();
    await app.prisma.product.deleteMany();
    await app.prisma.user.deleteMany();

    await app.close();
  });

describe("Consignment Order (HTTP)", () => {
  it("should create a consignment order item", async () => {
    const response = await app.inject({
      method: "POST",
      url: `/consignment-order-item/${consignmentOrderId}`,
      payload: productsCreated.map(product => ({
        itemId: product.id,
        quantitySent: Math.floor(Math.random() * 3) + 1,
      })),
    });
    const body = response.json();
    
   
    expect(response.statusCode).toBe(201);
  });
});
