"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
class ProductController {
    productService;
    constructor() {
        this.productService = new product_service_1.ProductService();
    }
    async create(req, res) {
        const data = req.body;
        const product = await this.productService.create(data);
        return res.status(201).send(product);
    }
    async update(req, res) {
        const data = req.body;
        const { id } = req.params;
        const product = await this.productService.update({ id, data });
        return res.send(product);
    }
    async getAll() {
        return await this.productService.findAll();
    }
    async delete(req, res) {
        const { id } = req.params;
        const product = await this.productService.delete(Number(id));
        return await res.status(204).send(product);
    }
}
exports.ProductController = ProductController;
