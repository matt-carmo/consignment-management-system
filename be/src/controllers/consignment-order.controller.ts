import { FastifyReply, FastifyRequest } from "fastify";
import { ConsignmentOrdersService } from "../services/consignment-order.service";
import { ConsignmentsOrdersRepository } from "../repositories/consignment-order.repository";
import { ConsignmentOrderFilters } from "../types/consignment-orders/filters";
import { Prisma } from "@prisma/client";
import { ConsignmentOrderItemRepository } from "../repositories/consignment-order-item.repository";
import { ConsignmentOrderItemService } from "../services/consignment-order-item.service";
import { PayConsignmentOrder, PayConsignmentOrderItems } from "../types/consignment-orders/pay";

export class ConsignmentOrderController {
  private consignmentsOrdersService;
  private consignmentOrderItemsService;
  constructor() {
    this.consignmentsOrdersService = new ConsignmentOrdersService(
      new ConsignmentsOrdersRepository()
    );
    this.consignmentOrderItemsService = new ConsignmentOrderItemService(
      new ConsignmentOrderItemRepository()
    );
  }

  public async payOrder(
    request: FastifyRequest<{
      Params: { orderId: string };
      Body: { items: PayConsignmentOrderItems[]; paid: boolean; paidAt: Date | null};
    }>,
    reply: FastifyReply
  ) {
    const { items } = request.body;
    const { orderId } = request.params;
    
    const consignmentOrderItems =
      await this.consignmentOrderItemsService.updateMany({
        items,
      });
    // return reply.send(consignmentOrderItems);
    if (!consignmentOrderItems) {
      return reply
        .status(400)
        .send({ message: "Erro ao atualizar os itens do pedido" });
    }    
    const consignmentOrder = await this.consignmentsOrdersService.pay({
      orderId: Number(orderId),
      paid: request.body.paid,
      paidAt: request.body.paidAt,
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
  public async delete(
    request: FastifyRequest<{ Params: { orderId: string } }>,
    reply: FastifyReply
  ) {
    await this.consignmentsOrdersService.delete({
      orderId: Number(request.params.orderId),
    });
    return reply.status(204).send();
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
