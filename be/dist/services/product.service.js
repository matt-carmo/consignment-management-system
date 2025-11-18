"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_repository_1 = require("../repositories/product.repository");
class ProductService {
    // constructor(productRepository: ProductRepository) {}
    productRepository = new product_repository_1.ProductRepository();
    async create(data) {
        return this.productRepository.create(data);
    }
    async update({ id, data }) {
        return this.productRepository.update({ id, data });
    }
    async delete(id) {
        return this.productRepository.delete(id);
    }
    async findAll() {
        return this.productRepository.findAll();
    }
}
exports.ProductService = ProductService;
