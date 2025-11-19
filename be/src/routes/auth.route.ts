import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth.controller";

export default async function authRoute(server: FastifyInstance) {
  const authRoute = new AuthController(server);
  server.post("/auth/signup", authRoute.signup.bind(authRoute));
  server.post("/auth/login", authRoute.login.bind(authRoute));
}
