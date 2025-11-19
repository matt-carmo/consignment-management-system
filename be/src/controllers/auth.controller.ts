import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import { AuthService } from "../services/auth.service";

export class AuthController {
   
    private authService: AuthService
  constructor(private server: FastifyInstance) {
    this.authService = new AuthService(this.server);
  }
  async signup(
    request: FastifyRequest<{ Body: Prisma.UserCreateInput }>,
    reply: FastifyReply
  ) {
    const user = request.body;
    const userCreated = await this.authService.signup({
      email: user.email,
      password: user.password,
      name: user.name,
    });
    if (!userCreated) {
      return reply
        .status(409)
        .send({ message: "User already exists or error creating user" });
    }
    const token = await this.authService.login(user.email, user.password);
    reply.status(201).send({ message: "User created successfully", token });
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };
      const token = await this.authService.login(email, password);
      if (!token) {
        return reply.status(401).send({ message: "Invalid credentials" });
      }
      reply.send({ token });
    } catch (error) {
      console.log(error);
    }
  }

  async refreshToken(request: FastifyRequest, reply: FastifyReply) {
    // refresh token logic
  }
}
