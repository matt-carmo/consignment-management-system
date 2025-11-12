import { FastifyReply, FastifyRequest } from "fastify";


export class ConsignmentOrdersController {
   private consignmentsService;
   constructor() {
     this.consignmentsService = new ConsignmentsService();
   }
 
  public async getConsignmentsOrdersById(
    request: FastifyRequest<{ Params: { consignmentId: string } }>,
    reply: FastifyReply
  ) {
    const consignmentsOrders = await request.server.consignmentsOrdersService.findAllById({
      consignmentId: request.params.consignmentId,
    });
    return reply.send(consignmentsOrders);
  }
  public async getConsignmentOrderById(
    request: FastifyRequest<{ Params: { orderId: string } }>,
    reply: FastifyReply
  ) {
    const consignmentOrder = await request.server.consignmentsOrdersService.findById({
      orderId: request.params.orderId,
    });
    return reply.send(consignmentOrder);
  }

  public async getOrderById(
    request: FastifyRequest<{ Params: { orderId: string } }>,
    reply: FastifyReply
  ) {
    const consignmentOrder = await request.server.consignmentsOrdersService({
      orderId: request.params.orderId,
    });
    return reply.send(consignmentOrder);
  }
}
