
import { ERRORS } from "../errors/app.errors";
import { Prisma } from "@prisma/client";
import { ConsignmentsRepository } from "../repositories/consignment.repository";

export class ConsignmentsService {
  
  constructor(private consignmentsRepository: ConsignmentsRepository) {}
  public async create(data: Prisma.ConsignmentCreateInput) {
    const consigment = await this.consignmentsRepository.create(data);
    if (!consigment) {
      throw new Error(ERRORS.CONSIGNMENT_ALREADY_EXISTS);
    }
    return consigment;
  }
  public async findAll() {
    const consignments = await this.consignmentsRepository.findAll();
    if (!consignments.length) {
      throw new Error(ERRORS.CONSIGNMENTS_NOT_FOUND);
    }
    return consignments;
  }
  public async update(data: Prisma.ConsignmentUpdateInput) {
    const id = data.id as string
    if(!id) {
      throw new Error
    }
    const consigment = await this.consignmentsRepository.update({id, data})
  }
    public async delete(data: Prisma.ConsignmentUpdateInput) {
    const id = data.id as string
    if(!id) {
      throw new Error
    }
    const consigment = await this.consignmentsRepository.delete(id)
  }
}