"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsignmentsService = void 0;
const app_errors_1 = require("../errors/app.errors");
class ConsignmentsService {
    consignmentRepository;
    constructor(consignmentRepository) {
        this.consignmentRepository = consignmentRepository;
    }
    async create(data) {
        const consigment = await this.consignmentRepository.create(data);
        if (!consigment) {
            throw new Error(app_errors_1.ERRORS.CONSIGNMENT_ALREADY_EXISTS);
        }
        return consigment;
    }
    async findAll() {
        const consignments = await this.consignmentRepository.findAll();
        if (!consignments.length) {
            throw new Error(app_errors_1.ERRORS.CONSIGNMENTS_NOT_FOUND);
        }
        return consignments;
    }
    async findById(id) {
        const consigment = await this.consignmentRepository.findById(id);
        if (!consigment) {
            throw new Error(app_errors_1.ERRORS.CONSIGNMENT_NOT_FOUND);
        }
        return consigment;
    }
    async update({ id, data }) {
        if (!id) {
            throw new Error;
        }
        const consigment = await this.consignmentRepository.update({ id, data });
        return consigment;
    }
    async delete(id) {
        if (!id) {
            throw new Error;
        }
        return this.consignmentRepository.delete(id);
    }
}
exports.ConsignmentsService = ConsignmentsService;
