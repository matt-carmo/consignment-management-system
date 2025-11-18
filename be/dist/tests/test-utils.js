"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
exports.createTestUser = createTestUser;
exports.createTestProduct = createTestProduct;
exports.createTestConsignment = createTestConsignment;
exports.createTestConsignmentOrder = createTestConsignmentOrder;
exports.createTestConsignmentOrderItem = createTestConsignmentOrderItem;
const server_1 = require("../server");
// tests/test-utils.ts
async function createApp() {
    const app = (0, server_1.buildServer)();
    await app.ready();
    return app;
}
async function createTestUser(app) {
    return app.prisma.user.create({
        data: {
            id: "cf910abd-487a-492d-a78f-e274bdbb50d1",
            email: "test@example.com",
            password: "123456",
            name: "Tester",
        },
    });
}
async function createTestProduct(app, data) {
    return app.prisma.product.create({
        data
    });
}
async function createTestConsignment(app, userId) {
    return app.prisma.consignment.create({
        data: {
            name: "Consignment Padrão",
            phone_number: "18999999999",
            id: "cf910abd-487a-492d-a78f-e274bdbb50d1",
            userId,
        },
    });
}
function createTestConsignmentOrder(app, consignmentId) {
    return app.prisma.consignmentOrder.create({
        data: {
            consignmentId,
        },
    });
}
function createTestConsignmentOrderItem(app, data) {
    return app.prisma.consignmentOrderItem.create({
        data,
    });
}
