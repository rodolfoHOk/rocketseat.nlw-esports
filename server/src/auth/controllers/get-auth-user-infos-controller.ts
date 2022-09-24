import { Request, Response } from 'express';
import { ProblemResponse } from '../errors/problem-response';
import { UserInfos } from '../providers/provider';
import { PrismaAuthUserRepository } from '../repositories/prisma-auth-user-repository';
import { GetAuthUserInfosService } from '../services/get-auth-user-infos-service';

export class GetAuthUserInfosController {
  async handle(req: Request, res: Response<UserInfos | ProblemResponse>) {
    const userId = req.user_id;
    if (userId) {
      const repository = new PrismaAuthUserRepository();
      const service = new GetAuthUserInfosService(repository);

      const user = await service.execute(userId);

      if (!user) {
        return res.status(404).json({
          message: 'User infos not found',
          status: 404,
        });
      }

      return res.status(200).json(user);
    }
  }
}
