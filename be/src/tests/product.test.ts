import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { buildServer } from "../server";
import type { FastifyInstance } from "fastify";
import { createTestUser } from "./test-utils";

let app: FastifyInstance;
let productCreatedId = "";

describe("Product (HTTP)", () => {
  beforeAll(async () => {
    app = buildServer();
    await app.ready();

    createTestUser(app);

  });

  afterAll(async () => {
    await app.prisma.product.deleteMany();
    await app.prisma.user.deleteMany();

    await app.close();
  });

  const basePayload = {
    name: "Produto Teste",
    price: 10.50,
    userId: "cf910abd-487a-492d-a78f-e274bdbb50d1",
  };

  it("should create a product", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/product",
      payload: basePayload,
    });

    expect(response.statusCode).toBe(201);

    const body = response.json();


    expect(body).toHaveProperty("id");
    expect(body).toMatchObject({
      name: basePayload.name,
      price: String(basePayload.price),
      userId: basePayload.userId,
    });

    productCreatedId = body.id;
  });

  it("should get all products", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/products",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();
    expect(Array.isArray(body)).toBe(true);

    const found = body.some((p: any) => p.id === productCreatedId);
    expect(found).toBe(true);
  });

  it("should update a product", async () => {
    const updatedPayload = {
      name: "Produto Atualizado",
      price: 30.0,
    };

    const response = await app.inject({
      method: "PUT",
      url: `/product/${productCreatedId}`,
      payload: updatedPayload,
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body).toMatchObject({
      name: updatedPayload.name,
      price: String(updatedPayload.price),
    });
  });

  it("should delete a product", async () => {
    const response = await app.inject({
      method: "DELETE",
      url: `/product/${productCreatedId}`,
    });

    expect(response.statusCode).toBe(204);

    const check = await app.inject({
      method: "GET",
      url: `/product/${productCreatedId}`,
    });
    expect(check.statusCode).toBe(404);
  });
});
