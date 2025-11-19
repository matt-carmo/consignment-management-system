import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import { ConsignmentsService } from "../services/consignment.service";
import { ConsignmentRepository } from "../repositories/consignment.repository";
export class ConsignmentsController {
  private consignmentsService = new ConsignmentsService(
    new ConsignmentRepository()
  );

  public async getAll(req: FastifyRequest, res: FastifyReply) {
    const consignments = await this.consignmentsService.findAll();
    return res.send(consignments);
  }

  public async getOne(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const consignment = await this.consignmentsService.findById(req.params.id);
    if (res.statusCode === 404)
      return res.send({ message: "Consignado nao encontrado" });
    return res.send(consignment);
  }

  public async create(
    req: FastifyRequest<{
      Body: Prisma.ConsignmentCreateInput & { userId: string };
    }>,
    res: FastifyReply
  ) {
    await req.jwtVerify();

    const user = req.user as { userId: string };
    const userId = user.userId;
    req.body.userId = userId;
    const consignment = await this.consignmentsService.create(req.body);

    return res.status(201).send(consignment);
  }

  public async update(
    req: FastifyRequest<{
      Params: { id: string };
      Body: Prisma.ConsignmentUpdateInput;
    }>,
    res: FastifyReply
  ) {
    const consignment = await this.consignmentsService.update({
      id: req.params.id,
      data: req.body,
    });
    return res.send(consignment);
  }

  public async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    await this.consignmentsService.delete(req.params.id);
    return res.status(204).send();
  }
}
