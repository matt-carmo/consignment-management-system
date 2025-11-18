import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { buildServer } from "../server";
import type { FastifyInstance } from "fastify";
import {  createTestProduct, createTestUser } from "./test-utils";

let app: FastifyInstance;
let consignmentCreatedId = "";

beforeAll(async () => {
    app = buildServer();
    await app.ready();

    await createTestUser(app);
    await createTestProduct(app, {
        description: "Test Product Description",
        name: "Test Product",
        price: 100,
        userId: "cf910abd-487a-492d-a78f-e274bdbb50d1",
    });  });

  afterAll(async () => {
    await app.prisma.consignment.deleteMany({
      where: {
        id: consignmentCreatedId,
      },
    });
    await app.prisma.consignment.deleteMany();
    await app.prisma.product.deleteMany();
    await app.prisma.user.deleteMany();

    await app.close();
  });
describe("Consignment (HTTP)", () => {
  

  const basePayload = {
    name: "Teste Name",
    phone_number: "18999999999",
    userId: "cf910abd-487a-492d-a78f-e274bdbb50d1",
  };

  it("should create a consignment", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/consignment",
      payload: basePayload,
    });

    expect(response.statusCode).toBe(201);

    const body = response.json();

    expect(body).toHaveProperty("id");
    expect(body).toMatchObject({
      name: basePayload.name,
      phone_number: basePayload.phone_number,
      userId: basePayload.userId,
    });

    consignmentCreatedId = body.id;
  });

  it("should get all consignments", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/consignments",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();
    expect(Array.isArray(body)).toBe(true);

    const found = body.some((c: any) => c.id === consignmentCreatedId);
    expect(found).toBe(true);
  });

  it("should update a consignment", async () => {
    const updatedPayload = {
      name: "Other Name",
      phone_number: "Other Phone Number",
    };

    const response = await app.inject({
      method: "PUT",
      url: `/consignment/${consignmentCreatedId}`,
      payload: updatedPayload,
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body).toMatchObject(updatedPayload);
  });

  it("should delete a consignment", async () => {
    const response = await app.inject({
      method: "DELETE",
      url: `/consignment/${consignmentCreatedId}`,
    });

    expect(response.statusCode).toBe(204);

    const check = await app.inject({
      method: "GET",
      url: `/consignment/${consignmentCreatedId}`,
    });
    expect(check.statusCode).toBe(404);
  });
});
