"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const server_1 = require("../server");
const test_utils_1 = require("./test-utils");
let app;
let consignmentCreatedId = "";
(0, vitest_1.beforeAll)(async () => {
    app = (0, server_1.buildServer)();
    await app.ready();
    await (0, test_utils_1.createTestUser)(app);
    await (0, test_utils_1.createTestProduct)(app, {
        description: "Test Product Description",
        name: "Test Product",
        price: 100,
        userId: "cf910abd-487a-492d-a78f-e274bdbb50d1",
    });
});
(0, vitest_1.afterAll)(async () => {
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
(0, vitest_1.describe)("Consignment (HTTP)", () => {
    const basePayload = {
        name: "Teste Name",
        phone_number: "18999999999",
        userId: "cf910abd-487a-492d-a78f-e274bdbb50d1",
    };
    (0, vitest_1.it)("should create a consignment", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/consignment",
            payload: basePayload,
        });
        (0, vitest_1.expect)(response.statusCode).toBe(201);
        const body = response.json();
        (0, vitest_1.expect)(body).toHaveProperty("id");
        (0, vitest_1.expect)(body).toMatchObject({
            name: basePayload.name,
            phone_number: basePayload.phone_number,
            userId: basePayload.userId,
        });
        consignmentCreatedId = body.id;
    });
    (0, vitest_1.it)("should get all consignments", async () => {
        const response = await app.inject({
            method: "GET",
            url: "/consignments",
        });
        (0, vitest_1.expect)(response.statusCode).toBe(200);
        const body = response.json();
        (0, vitest_1.expect)(Array.isArray(body)).toBe(true);
        const found = body.some((c) => c.id === consignmentCreatedId);
        (0, vitest_1.expect)(found).toBe(true);
    });
    (0, vitest_1.it)("should update a consignment", async () => {
        const updatedPayload = {
            name: "Other Name",
            phone_number: "Other Phone Number",
        };
        const response = await app.inject({
            method: "PUT",
            url: `/consignment/${consignmentCreatedId}`,
            payload: updatedPayload,
        });
        (0, vitest_1.expect)(response.statusCode).toBe(200);
        const body = response.json();
        (0, vitest_1.expect)(body).toMatchObject(updatedPayload);
    });
    (0, vitest_1.it)("should delete a consignment", async () => {
        const response = await app.inject({
            method: "DELETE",
            url: `/consignment/${consignmentCreatedId}`,
        });
        (0, vitest_1.expect)(response.statusCode).toBe(204);
        const check = await app.inject({
            method: "GET",
            url: `/consignment/${consignmentCreatedId}`,
        });
        (0, vitest_1.expect)(check.statusCode).toBe(404);
    });
});
