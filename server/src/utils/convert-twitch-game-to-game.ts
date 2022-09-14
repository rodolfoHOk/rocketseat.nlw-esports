import { Game } from '@prisma/client';
import { TwitchGameResponse } from '../twitch/get-twitch-game-by-id-service';

export function convertTwitchGameToGame(twitchGame: TwitchGameResponse): Game {
  return {
    id: twitchGame.data[0].id,
    title: twitchGame.data[0].name,
    bannerUrl: twitchGame.data[0].box_art_url
      .replace('{width}', '285')
      .replace('{height}', '380'),
  };
}
