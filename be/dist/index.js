"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
async function start() {
    const server = (0, server_1.buildServer)();
    try {
        const address = await server.listen({ port: 8080, host: "0.0.0.0" });
        console.log(`Server listening at ${address}`);
        console.log(process.env.POSTGRES_PORT);
    }
    catch (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
}
start();
