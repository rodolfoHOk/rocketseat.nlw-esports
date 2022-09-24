import { UserInfos } from '../providers/provider';
import { AuthUserRepository } from '../repositories/auth-user-repository';

export class GetAuthUserInfosService {
  constructor(private authUserRepository: AuthUserRepository) {}

  async execute(userId: string): Promise<UserInfos | null> {
    const user = await this.authUserRepository.findById(userId);
    if (user) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        discord: user.discord,
        avatarUrl: user.avatar_url,
      };
    }
    return null;
  }
}
