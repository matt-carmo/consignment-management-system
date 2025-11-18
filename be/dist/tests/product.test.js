"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const server_1 = require("../server");
const test_utils_1 = require("./test-utils");
let app;
let productCreatedId = "";
(0, vitest_1.describe)("Product (HTTP)", () => {
    (0, vitest_1.beforeAll)(async () => {
        app = (0, server_1.buildServer)();
        await app.ready();
        (0, test_utils_1.createTestUser)(app);
    });
    (0, vitest_1.afterAll)(async () => {
        await app.prisma.product.deleteMany();
        await app.prisma.user.deleteMany();
        await app.close();
    });
    const basePayload = {
        name: "Produto Teste",
        price: 10.50,
        userId: "cf910abd-487a-492d-a78f-e274bdbb50d1",
    };
    (0, vitest_1.it)("should create a product", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/product",
            payload: basePayload,
        });
        (0, vitest_1.expect)(response.statusCode).toBe(201);
        const body = response.json();
        (0, vitest_1.expect)(body).toHaveProperty("id");
        (0, vitest_1.expect)(body).toMatchObject({
            name: basePayload.name,
            price: String(basePayload.price),
            userId: basePayload.userId,
        });
        productCreatedId = body.id;
    });
    (0, vitest_1.it)("should get all products", async () => {
        const response = await app.inject({
            method: "GET",
            url: "/products",
        });
        (0, vitest_1.expect)(response.statusCode).toBe(200);
        const body = response.json();
        (0, vitest_1.expect)(Array.isArray(body)).toBe(true);
        const found = body.some((p) => p.id === productCreatedId);
        (0, vitest_1.expect)(found).toBe(true);
    });
    (0, vitest_1.it)("should update a product", async () => {
        const updatedPayload = {
            name: "Produto Atualizado",
            price: 30.0,
        };
        const response = await app.inject({
            method: "PUT",
            url: `/product/${productCreatedId}`,
            payload: updatedPayload,
        });
        (0, vitest_1.expect)(response.statusCode).toBe(200);
        const body = response.json();
        (0, vitest_1.expect)(body).toMatchObject({
            name: updatedPayload.name,
            price: String(updatedPayload.price),
        });
    });
    (0, vitest_1.it)("should delete a product", async () => {
        const response = await app.inject({
            method: "DELETE",
            url: `/product/${productCreatedId}`,
        });
        (0, vitest_1.expect)(response.statusCode).toBe(204);
        const check = await app.inject({
            method: "GET",
            url: `/product/${productCreatedId}`,
        });
        (0, vitest_1.expect)(check.statusCode).toBe(404);
    });
});
