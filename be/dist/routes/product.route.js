"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = productsRoute;
const product_controller_1 = require("../controllers/product.controller");
async function productsRoute(server) {
    const productsController = new product_controller_1.ProductController();
    server.get("/products", productsController.getAll.bind(productsController));
    server.post("/product", productsController.create.bind(productsController));
    server.put("/product/:id", productsController.update.bind(productsController));
    server.delete("/product/:id", productsController.delete.bind(productsController));
}
