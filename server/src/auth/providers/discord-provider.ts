import axios from 'axios';
import { Provider, UserInfos } from './provider';
import FormData from 'form-data';

interface DiscordTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

interface DiscordUserResponse {
  id: string;
  username: string;
  discriminator: number;
  avatar: string;
  verified: boolean;
  email: string;
  flags: number;
  banner: string;
  accent_color: number;
  premium_type: number;
  public_flags: number;
}

const baseUrl = 'https://discord.com/api/v10';

export class DiscordProvider implements Provider {
  async getToken(code: string): Promise<string> {
    const tokenUrl = `${baseUrl}/oauth2/token`;
    const redirectUri = 'http://localhost:5173';

    const form = new FormData();
    form.append('client_id', process.env.DISCORD_CLIENT_ID as string);
    form.append('client_secret', process.env.DISCORD_CLIENT_SECRET as string);
    form.append('grant_type', 'authorization_code');
    form.append('code', code);
    form.append('redirect_uri', redirectUri);

    const tokenResponse = await axios.post<DiscordTokenResponse>(
      tokenUrl,
      form,
      { headers: form.getHeaders() }
    );
    return tokenResponse.data.access_token;
  }

  async getUserInfos(token: string): Promise<UserInfos> {
    const userInfoUrl = `${baseUrl}/users/@me`;

    const userResponse = await axios.get<DiscordUserResponse>(userInfoUrl, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const user = userResponse.data;

    const userInfos: UserInfos = {
      id: user.id,
      username: user.username,
      email: user.email,
      discord: `${user.username}#${user.discriminator}`,
      avatarUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
    };

    return userInfos;
  }
}
