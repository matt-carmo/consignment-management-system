"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = consignmentRoute;
const server_1 = require("../server");
const consignment_controller_1 = require("../controllers/consignment.controller");
async function consignmentRoute() {
    const consignmentsController = new consignment_controller_1.ConsignmentsController();
    server_1.server.get("/consignments", consignmentsController.getAll.bind(consignmentsController));
    server_1.server.get("/consignment/:id", consignmentsController.getOne.bind(consignmentsController));
    server_1.server.post("/consignment", consignmentsController.create.bind(consignmentsController));
    server_1.server.put("/consignment/:id", consignmentsController.update.bind(consignmentsController));
    server_1.server.delete("/consignment/:id", consignmentsController.delete.bind(consignmentsController));
}
