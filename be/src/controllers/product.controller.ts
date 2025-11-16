import { Prisma } from "@prisma/client";
import { ProductService } from "../services/product.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { ProductRepository } from "../repositories/product.repository";

export class ProductController {
  private productService;
  constructor() {
    this.productService = new ProductService();
  }
  async create(
    req: FastifyRequest<{ Body: Prisma.ProductCreateInput }>,
    res: FastifyReply
  ) {
    const data = req.body;
    const product = await this.productService.create(data);
    return res.status(201).send(product);
  }
  async update(
    req: FastifyRequest<{
      Params: { id: string };
      Body: Prisma.ProductUncheckedUpdateInput;
    }>,
    res: FastifyReply
  ) {
    const data = req.body;
    const { id } = req.params;
    const product = await this.productService.update({ id, data });
    return res.send(product);
  }
  async getAll() {
    return await this.productService.findAll();
  }
  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const product = await this.productService.delete(Number(id));
    return await res.status(204).send(product);
  }
}
