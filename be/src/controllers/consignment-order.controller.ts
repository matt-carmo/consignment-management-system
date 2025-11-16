import { FastifyReply, FastifyRequest } from "fastify";
import { ConsignmentOrdersService } from "../services/consignment-order.service";
import { ConsignmentsOrdersRepository } from "../repositories/consignment-order.repository";
import { ConsignmentOrderFilters } from "../types/consignment-orders/filters";
import { Prisma } from "@prisma/client";

export class ConsignmentOrdersController {
  private consignmentsOrdersService;
  constructor() {
    this.consignmentsOrdersService = new ConsignmentOrdersService(
      new ConsignmentsOrdersRepository()
    );
  }

  public async payOrder(
    request: FastifyRequest<{ Params: { orderId: string } }>,
    reply: FastifyReply
  ) {
    const consignmentOrder = await this.consignmentsOrdersService.pay({
      orderId: Number(request.params.orderId),
      paid: true,
      paidAt: new Date(),
    });
    return reply.send(consignmentOrder);
  }
  public async getOrders(
    request: FastifyRequest<{ Params: ConsignmentOrderFilters }>,
    reply: FastifyReply
  ) {
    const consignmentsOrders =
      await this.consignmentsOrdersService.findAllByUserId({
        params: request.params,
      });
    return reply.send(consignmentsOrders);
  }
  public async create(
    request: FastifyRequest<{
      Body: Prisma.ConsignmentOrderUncheckedCreateInput;
    }>,
    reply: FastifyReply
  ) {
    const consignmentOrder = await this.consignmentsOrdersService.create({
      consignmentId: request.body.consignmentId,
    });
    return reply.status(201).send(consignmentOrder);
  }
  public async getOrderById(
    request: FastifyRequest<{ Params: { orderId: string } }>,
    reply: FastifyReply
  ) {
    const consignmentOrder = await this.consignmentsOrdersService.findById({
      orderId: Number(request.params.orderId),
    });
    return reply.send(consignmentOrder);
  }
}
