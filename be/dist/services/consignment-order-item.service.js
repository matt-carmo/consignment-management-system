"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsignmentOrderItemService = void 0;
const product_repository_1 = require("../repositories/product.repository");
class ConsignmentOrderItemService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    productRepository = new product_repository_1.ProductRepository();
    async create(data) {
        return this.repository.create(data);
    }
    async createMany({ orderId, body, }) {
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
    async updateMany({ items }) {
        return this.repository.updateMany({
            items,
        });
    }
    async update({ id, data, }) {
        return this.repository.update({ id, data });
    }
    async delete(id) {
        return this.repository.delete(id);
    }
}
exports.ConsignmentOrderItemService = ConsignmentOrderItemService;
