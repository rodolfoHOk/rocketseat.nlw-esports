import { twitchClient } from './twitch-client';

interface TwitchGame {
  box_art_url: string;
  id: string;
  name: string;
  pagination: {
    cursor: string;
  };
}

export interface TopGamesResponse {
  data: TwitchGame[];
}

export class GetTwitchTopGamesService {
  async execute(): Promise<TopGamesResponse> {
    const { data: topGamesResponse } = await twitchClient.get<TopGamesResponse>(
      '/games/top',
      {
        params: {
          first: 10,
        },
      }
    );

    return topGamesResponse;
  }
}
