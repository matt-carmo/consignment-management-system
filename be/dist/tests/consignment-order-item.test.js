"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const server_1 = require("../server");
const test_utils_1 = require("./test-utils");
let app;
let consignmentOrderId = null;
let productsCreated = [];
(0, vitest_1.beforeAll)(async () => {
    app = (0, server_1.buildServer)();
    await app.ready();
    await (0, test_utils_1.createTestUser)(app);
    const products = Array.from({ length: 4 }).map((_, index) => ({
        name: "Test Product " + index,
        price: Math.floor(Math.random() * 8.50) + 2,
        description: "A product for testing purposes",
        userId: "cf910abd-487a-492d-a78f-e274bdbb50d1",
    }));
    const createdProducts = await Promise.all(products.map((product) => (0, test_utils_1.createTestProduct)(app, product)));
    productsCreated = createdProducts;
    await (0, test_utils_1.createTestConsignment)(app, "cf910abd-487a-492d-a78f-e274bdbb50d1");
    const consignmentOrder = await (0, test_utils_1.createTestConsignmentOrder)(app, "cf910abd-487a-492d-a78f-e274bdbb50d1");
    consignmentOrderId = consignmentOrder.id;
});
(0, vitest_1.afterAll)(async () => {
    await app.prisma.consignmentOrderItem.deleteMany();
    await app.prisma.consignmentOrder.deleteMany();
    await app.prisma.consignment.deleteMany();
    await app.prisma.product.deleteMany();
    await app.prisma.user.deleteMany();
    await app.close();
});
(0, vitest_1.describe)("Consignment Order (HTTP)", () => {
    (0, vitest_1.it)("should create a consignment order item", async () => {
        const response = await app.inject({
            method: "POST",
            url: `/consignment-order-item/${consignmentOrderId}`,
            payload: productsCreated.map(product => ({
                itemId: product.id,
                quantitySent: Math.floor(Math.random() * 3) + 1,
            })),
        });
        const body = response.json();
        (0, vitest_1.expect)(response.statusCode).toBe(201);
    });
});
