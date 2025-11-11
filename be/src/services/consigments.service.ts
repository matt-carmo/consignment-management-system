import { ConsigmentsRepository } from "../repositories/consigments.repository";
import { ERRORS } from "../errors/app.errors";
import { Prisma } from "@prisma/client";

export class ConsigmentsService {
  private consigmentsRepository;
  constructor() {
    this.consigmentsRepository = new ConsigmentsRepository();
  }
  public async create(data: Prisma.ConsignmentCreateInput) {
    const consigment = await this.consigmentsRepository.create(data);
    if (!consigment) {
      throw new Error(ERRORS.CONSIGNMENT_ALREADY_EXISTS);
    }
    return consigment;
  }
  public async getConsigments() {
    const consigments = await this.consigmentsRepository.findAll();
    if (!consigments.length) {
      throw new Error(ERRORS.CONSIGMENTS_NOT_FOUND);
    }
    return consigments;
  }
}