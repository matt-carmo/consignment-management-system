"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const server_1 = require("../server");
const test_utils_1 = require("./test-utils");
let app;
let consignmentOrderId = "";
let productCreatedId = null;
let consignmentOrderItemId = null;
(0, vitest_1.beforeAll)(async () => {
    app = (0, server_1.buildServer)();
    await app.ready();
    await (0, test_utils_1.createTestUser)(app);
    const product = await (0, test_utils_1.createTestProduct)(app, {
        description: "A product for testing purposes",
        name: "Test Product",
        price: 5.99,
        userId: "cf910abd-487a-492d-a78f-e274bdbb50d1",
    });
    productCreatedId = product.id;
    await (0, test_utils_1.createTestConsignment)(app, "cf910abd-487a-492d-a78f-e274bdbb50d1");
    await (0, test_utils_1.createTestConsignmentOrder)(app, "cf910abd-487a-492d-a78f-e274bdbb50d1");
    const consignmentOrder = await (0, test_utils_1.createTestConsignmentOrder)(app, "cf910abd-487a-492d-a78f-e274bdbb50d1");
    const consignmentOrderItem = await (0, test_utils_1.createTestConsignmentOrderItem)(app, {
        itemNameSnapshot: product.name,
        itemPriceSnapshot: product.price.toString(),
        consignmentOrderId: consignmentOrder.id,
        itemId: product.id,
        quantitySent: 3,
    });
    consignmentOrderItemId = consignmentOrderItem.id;
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
    (0, vitest_1.it)("should create a consignment order", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/consignment-order",
            payload: {
                consignmentId: "cf910abd-487a-492d-a78f-e274bdbb50d1",
            },
        });
        const body = response.json();
        consignmentOrderId = body.id;
        (0, vitest_1.expect)(response.statusCode).toBe(201);
    });
    (0, vitest_1.it)("should paid a consignment order", async () => {
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
        (0, vitest_1.expect)(body.count > 0).toBe(true);
        (0, vitest_1.expect)(response.statusCode).toBe(200);
    });
    (0, vitest_1.it)("should delete a consignment order", async () => {
        const response = await app.inject({
            method: "DELETE",
            url: `/consignment-order/${consignmentOrderId}`,
        });
        (0, vitest_1.expect)(response.statusCode).toBe(204);
    });
});
