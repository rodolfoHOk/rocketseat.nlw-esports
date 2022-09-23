import { prisma } from '../../prisma';
import {
  AuthUserRepository,
  CreateUserData,
  UserData,
} from './auth-user-repository';

export class PrismaAuthUserRepository implements AuthUserRepository {
  async create(data: CreateUserData): Promise<UserData> {
    return await prisma.user.create({ data });
  }

  async findById(id: string): Promise<UserData | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
