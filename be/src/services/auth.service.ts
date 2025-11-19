import * as argon2 from "argon2";
import { UserRepository } from "../repositories/user.repository";
import { FastifyInstance } from "fastify";

export class AuthService {
  constructor(private server: FastifyInstance) {
    this.repository = new UserRepository();
  }

  private repository: UserRepository;

  async signup(userData: { email: string; password: string; name: string }) {
    const { email, password, name } = userData;

    const existingUser = await this.repository.findUnique(email);
    if (existingUser) {
      return null; // User already exists
    }
    const passwordHash = await argon2.hash(password);
    const newUser = await this.repository.create({
      email,
      password: passwordHash,
      name,
    });
    if (!newUser) {
      return null; // Error creating user
    }

    return newUser;
  }

  async login(email: string, password: string) {
    const user = await this.repository.findUnique(email);
    if (!user) {
      return null; // User not found
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return null;
    }
    const token = this.server.jwt.sign({ userId: user.id, email: user.email });
    return token;
  }

  static async refreshToken(token: string) {
    // refresh token logic
  }
}
