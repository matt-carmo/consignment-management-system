import { Prisma } from "@prisma/client";
import { ConsignmentOrderItemRepository } from "../repositories/consignment-order-item.repository";
import { ProductRepository } from "../repositories/product.repository";


export class ConsignmentOrderItemService {
  constructor(private repository: ConsignmentOrderItemRepository) {}
    private productRepository = new ProductRepository();
  public async create(data: Prisma.ConsignmentOrderItemCreateInput) {
    return this.repository.create(data);
  }
    public async createMany({orderId, body}: {orderId: string; body: { itemId: number; quantitySent: number }[]}) {
    const productIds = body.map((item) => item.itemId);
    const products = await this.productRepository.findAllById(productIds);
    const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

    const itemsData = body.map((item) => {
      return {
        itemPriceSnapshot: productMap[item.itemId].price,
        itemNameSnapshot: productMap[item.itemId].name,
        consignmentOrderId: Number(orderId),
        itemId: item.itemId,
        quantitySent: item.quantitySent,
      };
    });
    return this.repository.createMany(itemsData);
  }
  public async update({ id, data }: { id: string; data: Prisma.ConsignmentOrderItemUncheckedUpdateInput }) {
    return this.repository.update({ id, data });
  }
  public async delete(id: number) {
    return this.repository.delete(id);
  }
//   public async findAllByConsignmentOrderId({consignmentOrderId}: {consignmentOrderId: number}) {
//     return this.repository.findAllByConsignmentOrderId(consignmentOrderId)
//   }
  
}
