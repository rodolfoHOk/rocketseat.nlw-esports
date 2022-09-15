import axios from 'axios';
import FormData from 'form-data';
import { twitchClient } from './twitch-client';

interface Token {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export class AuthenticateTwitchService {
  async execute() {
    const url = 'https://id.twitch.tv/oauth2/token';

    const form = new FormData();
    form.append('client_id', process.env.TWITCH_CLIENT_ID);
    form.append('client_secret', process.env.TWITCH_CLIENT_SECRET);
    form.append('grant_type', 'client_credentials');

    const { data: accessTokenResponse } = await axios.post<Token>(url, form, {
      headers: form.getHeaders(),
    });

    twitchClient.defaults.headers.common.Authorization = `Bearer ${accessTokenResponse.access_token}`;
    twitchClient.defaults.headers.common['Client-Id'] = process.env
      .TWITCH_CLIENT_ID as string;
  }
}
