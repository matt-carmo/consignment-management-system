import { Prisma } from "@prisma/client";
import { ProductRepository } from "../repositories/product";

export class ProductService {
    constructor(productRepository: ProductRepository) {}
    private productRepository = new ProductRepository();

    public async create(data: Prisma.ProductCreateInput) {
        return this.productRepository.create(data);
    }
    public async findAll() {
        return this.productRepository.findAll();
    }
}