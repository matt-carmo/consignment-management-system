import { Prisma } from "@prisma/client";
import { ProductService } from "../services/product.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { ProductRepository } from "../repositories/product";

export class ProductController  {
    private productService
    constructor() {
        this.productService = new ProductService(new ProductRepository);
    }
    create(req:FastifyRequest<{Body: Prisma.ProductCreateInput}>, res:FastifyReply) {
        const data = req.body;
        return this.productService.create(data);
    }
    getAll() {
        return this.productService.findAll();
    }

}