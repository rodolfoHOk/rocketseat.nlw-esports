import {
  AuthUserRepository,
  UserData,
} from '../repositories/auth-user-repository';

export class GetAuthUserInfosService {
  constructor(private authUserRepository: AuthUserRepository) {}

  async execute(userId: string): Promise<UserData | null> {
    return await this.authUserRepository.findById(userId);
  }
}
