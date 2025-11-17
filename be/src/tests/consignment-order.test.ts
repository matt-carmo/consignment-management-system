import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { buildServer } from "../server";
import type { FastifyInstance } from "fastify";
import { createTestConsignment, createTestConsignmentOrder, createTestConsignmentOrderItem, createTestProduct, createTestUser } from "./test-utils";

let app: FastifyInstance;
let consignmentOrderId = "";
let productCreatedId = null;
let consignmentOrderItemId: any = null;
 beforeAll(async () => {
    app = buildServer();

    await app.ready();
    
    await createTestUser(app);
    const product = await createTestProduct(app, {
        description: "A product for testing purposes",
        name: "Test Product",
        price: 5.99,
        userId: "cf910abd-487a-492d-a78f-e274bdbb50d1",
    });
    productCreatedId = product.id;
    await createTestConsignment(app, "cf910abd-487a-492d-a78f-e274bdbb50d1");
    await createTestConsignmentOrder(app, "cf910abd-487a-492d-a78f-e274bdbb50d1");
    const consignmentOrder = await createTestConsignmentOrder(app, "cf910abd-487a-492d-a78f-e274bdbb50d1");
     const consignmentOrderItem = await createTestConsignmentOrderItem(app, {
        itemNameSnapshot: product.name,
        itemPriceSnapshot: product.price.toString(),
        consignmentOrderId: consignmentOrder.id,
        itemId: product.id,
        quantitySent: 3,
    });
    consignmentOrderItemId = consignmentOrderItem.id;
 
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
        items: [
            {
              id: consignmentOrderItemId,
              quantityReturned: 1,
              quantitySent: 3
            },
        ],

        


      },
    });
    const body = response.json();

    expect(body.count > 0).toBe(true);
  
    expect(response.statusCode).toBe(200);
  });
  it("should delete a consignment order", async () => {
    const response = await app.inject({
      method: "DELETE",
      url: `/consignment-order/${consignmentOrderId}`,
    });
    expect(response.statusCode).toBe(204);
  });
});
