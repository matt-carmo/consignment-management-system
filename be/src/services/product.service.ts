import { Prisma } from "@prisma/client";
import { ProductRepository } from "../repositories/product.repository";

export class ProductService {
    // constructor(productRepository: ProductRepository) {}
    private productRepository = new ProductRepository();

    public async create(data: Prisma.ProductCreateInput) {
        return this.productRepository.create(data);
    }
    public async update({ id, data }: { id: string; data: Prisma.ProductUncheckedUpdateInput }) {
        return this.productRepository.update({ id, data });
    }
    public async delete(id: number) {
        return this.productRepository.delete(id);
    }
    public async findAll({userId}: {userId: string}) {
        return this.productRepository.findAll({userId});
    }
}