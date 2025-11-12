import { ConsignmentsRepository } from "../repositories/consignments.repository";
import { ERRORS } from "../errors/app.errors";
import { Prisma } from "@prisma/client";

export class ConsignmentsService {
  private consignmentsRepository;
  constructor() {
    this.consignmentsRepository = new ConsignmentsRepository();
  }
  public async create(data: Prisma.ConsignmentCreateInput) {
    const consigment = await this.consignmentsRepository.create(data);
    if (!consigment) {
      throw new Error(ERRORS.CONSIGNMENT_ALREADY_EXISTS);
    }
    return consigment;
  }
  public async getConsignments() {
    const consignments = await this.consignmentsRepository.findAll();
    if (!consignments.length) {
      throw new Error(ERRORS.Consignments_NOT_FOUND);
    }
    return consignments;
  }
}