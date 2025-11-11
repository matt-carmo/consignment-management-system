import { FastifyReply, FastifyRequest } from "fastify";
import { ConsigmentsService } from "../services/consigments.service";
import { Prisma } from "@prisma/client";
export class ConsigmentsController {
  private consigmentsService;
  constructor() {
    this.consigmentsService = new ConsigmentsService();
  }
  public async getAll(req: FastifyRequest, res: FastifyReply) {
    const consigments = await this.consigmentsService.getConsigments();
    return res.send(consigments);
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
    const consigment = await this.consigmentsService.create(data);
    return res.status(201).send(consigment);
  }
  public async update(req: FastifyRequest, res: FastifyReply) {}
  public async delete(req: FastifyRequest, res: FastifyReply) {}
}
