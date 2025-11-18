"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
exports.buildServer = buildServer;
const fastify_1 = __importDefault(require("fastify"));
const prisma_1 = __importDefault(require("./plugins/prisma"));
const app_errors_1 = require("./errors/app.errors");
const consignment_route_1 = __importDefault(require("./routes/consignment.route"));
const consignment_orders_route_1 = require("./routes/consignment-orders.route");
exports.server = (0, fastify_1.default)();
const cors_1 = __importDefault(require("@fastify/cors"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const consignment_order_item_route_1 = require("./routes/consignment-order-item.route");
function buildServer() {
    exports.server.register(prisma_1.default);
    exports.server.register(cors_1.default, {
        origin: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    });
    exports.server.setErrorHandler((error, req, reply) => {
        switch (error.message) {
            case app_errors_1.ERRORS.CONSIGNMENT_NOT_FOUND:
                return reply.status(404).send({ message: "Consignado não encontrado" });
            case app_errors_1.ERRORS.CONSIGNMENTS_NOT_FOUND:
                return reply
                    .status(200)
                    .send({ message: "Consignados não encontrados", data: [] });
            case app_errors_1.ERRORS.CONSIGNMENT_ALREADY_EXISTS:
                return reply.status(409).send({ message: "Consignado já cadastrado" });
        }
        return reply
            .status(500)
            .send({ message: "Erro interno no servidor", error });
    });
    exports.server.register(consignment_route_1.default);
    exports.server.register(consignment_orders_route_1.consignmentOrdersRoute);
    exports.server.register(product_route_1.default);
    exports.server.register(consignment_order_item_route_1.consignmentOrderItemRoute);
    return exports.server;
}
