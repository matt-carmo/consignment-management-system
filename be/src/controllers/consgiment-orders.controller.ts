import { FastifyReply, FastifyRequest } from "fastify";


export class ConsigmentsOrdersController {
 constructor() {}
  public async getConsigmentsOrdersById(
    request: FastifyRequest<{ Params: { consignmentId: string } }>,
    reply: FastifyReply
  ) {
    const consigmentsOrders = await request.server.consigmentsOrdersService.findAllById({
      consignmentId: request.params.consignmentId,
    });
    return reply.send(consigmentsOrders);
  }
}
