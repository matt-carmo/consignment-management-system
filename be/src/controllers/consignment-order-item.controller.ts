import { FastifyReply, FastifyRequest } from "fastify";
import { ConsignmentOrderItemRepository } from "../repositories/consignment-order-item.repository";
import { ConsignmentOrderItemService } from "../services/consignment-order-item.service";
import { Prisma } from "@prisma/client";


export class ConsignmentOrderItemController {
  private service = new ConsignmentOrderItemService(
    new ConsignmentOrderItemRepository()
  );

  async create(
    req: FastifyRequest<{ Params: { orderId: string }; Body: { itemId: number; quantitySent: number }[] }>,
    res: FastifyReply
  ) {
    const { body } = req;
    const { orderId } = req.params;

    const consignmentOrderItems = await this.service.createMany({body, orderId});

    return res.status(201).send({ message: "Itens criados com sucesso", data: consignmentOrderItems });
  }
  async update(
    req: FastifyRequest<{
      Params: { id: string };
      Body: {ItemId: number; quantitySent: number; quantityReturned: number};
    }>,
    res: FastifyReply
  ) {
    const consignmentOrderItem = await this.service.update({
      id: req.params.id,
      data: req.body,
    });
    
    return res.send(consignmentOrderItem);
  }
//   async findAllByConsignmentOrderId(
//     req: FastifyRequest<{ Params: { id: string } }>,
//     res: FastifyReply
//   ) {
//     const consignmentOrderItems =
//       await this.service.findAllByConsignmentOrderId({
//         consignmentOrderId: Number(req.params.id),
//       });
//     return res.send(consignmentOrderItems);
//   }
  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    await this.service.delete(Number(req.params.id));
    return res.status(204).send();
  }
}
