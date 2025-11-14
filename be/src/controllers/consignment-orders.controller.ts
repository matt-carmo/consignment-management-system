import { FastifyReply, FastifyRequest } from "fastify";
import { ConsignmentOrdersService } from "../services/consignment-orders.service";
import { ConsignmentsOrdersRepository } from "../repositories/consignment-orders.repository";
import { Prisma } from "@prisma/client";
import { ConsignmentOrderFilters } from "../types/consignment-orders/filters";





export class ConsignmentOrdersController {
   private consignmentsOrdersService;
   constructor() {
     this.consignmentsOrdersService = new ConsignmentOrdersService(new ConsignmentsOrdersRepository());
   }
 
  public async getOrders(
    request: FastifyRequest<{ Params: ConsignmentOrderFilters }>,
    reply: FastifyReply
  ) {
    const consignmentsOrders = await this.consignmentsOrdersService.findAllByUserId({params: request.params});
    return reply.send(consignmentsOrders);
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
