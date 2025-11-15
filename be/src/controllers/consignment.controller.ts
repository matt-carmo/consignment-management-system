import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import { ConsignmentsService } from "../services/consignment.service";
import { ConsignmentsRepository } from "../repositories/consignment.repository";
export class ConsignmentsController {
  private consignmentsService;
  constructor() {
    this.consignmentsService = new ConsignmentsService(new ConsignmentsRepository);
  }
  public async getAll(req: FastifyRequest, res: FastifyReply) {
    const consignments = await this.consignmentsService.findAll();
    return res.send(consignments);
  }
  public async create(
    req: FastifyRequest<{
      user: { id: string };
      Body: Prisma.ConsignmentCreateInput & { userId: string };
    }>,
    res: FastifyReply
  ) {
    const data = {
      name: req.body.name,
      phone_number: req.body.phone_number,
      user: { connect: { id: req.body.userId } }
    };
    const consigment = await this.consignmentsService.create(data);
    return res.status(201).send(consigment);
  }
  public async update(req: FastifyRequest<{Body: Prisma.ConsignmentUpdateInput, res: FastifyReply}>) {
    const data = req.body
    const consigment = await this.consignmentsService.update(data)
  }
  public async delete(req: FastifyRequest, res: FastifyReply) {}
}
