import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/product.controller";

export default async function productsRoute(server: FastifyInstance) {
    const productsController = new ProductController();
    server.get(
        "/products",
        productsController.getAll.bind(productsController)
    );
    server.post(
        "/product",
        productsController.create.bind(productsController)
    );
    server.put(
        "/product/:id",
        productsController.update.bind(productsController)
    );
    server.delete(
        "/product/:id",
        productsController.delete.bind(productsController)
    );
}