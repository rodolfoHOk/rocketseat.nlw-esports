import { twitchClient } from './twitch-client';

interface TwitchGame {
  box_art_url: string;
  id: string;
  name: string;
}

export interface TwitchGameResponse {
  data: TwitchGame[];
}

export class GetTwitchGameByIdService {
  async execute(id: string): Promise<TwitchGameResponse> {
    const { data: twitchGameResponse } =
      await twitchClient.get<TwitchGameResponse>('/games', {
        params: {
          id,
        },
      });

    return twitchGameResponse;
  }
}
