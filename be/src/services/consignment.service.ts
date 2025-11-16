
import { ERRORS } from "../errors/app.errors";
import { Prisma } from "@prisma/client";
import { ConsignmentRepository } from "../repositories/consignment.repository";

export class ConsignmentsService {
  
  constructor(private consignmentRepository: ConsignmentRepository) {}
  public async create(data: Prisma.ConsignmentCreateInput) {
    const consigment = await this.consignmentRepository.create(data);
    if (!consigment) {
      throw new Error(ERRORS.CONSIGNMENT_ALREADY_EXISTS);
    }
    return consigment;
  }
  public async findAll() {
    const consignments = await this.consignmentRepository.findAll();
    if (!consignments.length) {
      throw new Error(ERRORS.CONSIGNMENTS_NOT_FOUND);
    }
    return consignments;
  }
  public async findById(id: string) {
    const consigment = await this.consignmentRepository.findById(id);
    if (!consigment) {
      throw new Error(ERRORS.CONSIGNMENT_NOT_FOUND);
    }
    return consigment;
  }
  public async update({id, data}: {id:string, data: Prisma.ConsignmentUpdateInput}) {
    if(!id) {
      throw new Error
    }
    const consigment = await this.consignmentRepository.update({id, data})
    return consigment
  }
    public async delete(id: string) {
    if(!id) {
      throw new Error
    }
    return this.consignmentRepository.delete(id)
  }
}