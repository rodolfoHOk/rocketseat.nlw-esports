import { Request, Response } from 'express';
import { ProblemResponse } from '../errors/problem-response';
import { DiscordProvider } from '../providers/discord-provider';
import { PrismaAuthUserRepository } from '../repositories/prisma-auth-user-repository';
import {
  AuthenticateUserResponse,
  AuthenticateUserService,
} from '../services/authenticate-user-service';

export class AuthenticateUserController {
  async handle(
    req: Request,
    res: Response<AuthenticateUserResponse | ProblemResponse>
  ) {
    const { code } = req.body;

    const repository = new PrismaAuthUserRepository();
    const provider = new DiscordProvider();
    const service = new AuthenticateUserService(provider, repository);

    try {
      const response = await service.execute(code);
      res.status(200).json(response);
    } catch (err) {
      if (err instanceof Error) {
        res.status(502).json({
          message: err.message,
          status: 502,
        });
      }
    }
  }
}
