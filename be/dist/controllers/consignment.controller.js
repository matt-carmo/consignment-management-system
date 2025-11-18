"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsignmentsController = void 0;
const consignment_service_1 = require("../services/consignment.service");
const consignment_repository_1 = require("../repositories/consignment.repository");
class ConsignmentsController {
    consignmentsService = new consignment_service_1.ConsignmentsService(new consignment_repository_1.ConsignmentRepository());
    async getAll(req, res) {
        const consignments = await this.consignmentsService.findAll();
        return res.send(consignments);
    }
    async getOne(req, res) {
        const consignment = await this.consignmentsService.findById(req.params.id);
        if (res.statusCode === 404)
            return res.send({ message: "Consignado nao encontrado" });
        return res.send(consignment);
    }
    async create(req, res) {
        const consignment = await this.consignmentsService.create(req.body);
        return res.status(201).send(consignment);
    }
    async update(req, res) {
        const consignment = await this.consignmentsService.update({ id: req.params.id, data: req.body });
        return res.send(consignment);
    }
    async delete(req, res) {
        await this.consignmentsService.delete(req.params.id);
        return res.status(204).send();
    }
}
exports.ConsignmentsController = ConsignmentsController;
