import { AuthUserRepository } from '../repositories/auth-user-repository';
import { Provider, UserInfos } from '../providers/provider';
import { sign } from 'jsonwebtoken';

export interface AuthenticateUserResponse {
  token: string;
  user: UserInfos;
}

export class AuthenticateUserService {
  constructor(
    private provider: Provider,
    private authUserRepository: AuthUserRepository
  ) {}

  async execute(code: string): Promise<AuthenticateUserResponse> {
    const discordToken = await this.provider.getToken(code);

    const userInfos = await this.provider.getUserInfos(discordToken);

    let user = await this.authUserRepository.findById(userInfos.id);
    if (!user) {
      user = await this.authUserRepository.create({
        id: userInfos.id,
        username: userInfos.username,
        email: userInfos.email,
        discord: userInfos.discord,
        avatar_url: userInfos.avatarUrl,
      });
    }

    const appToken = sign(
      {
        scopes: ['READ', 'WRITE'],
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: 24 * 60 * 60,
      }
    );

    return {
      token: appToken,
      user: userInfos,
    };
  }
}
