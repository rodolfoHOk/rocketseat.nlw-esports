import { Game } from '@prisma/client';
import { TopGamesResponse } from '../twitch/get-twitch-top-games-service';

export function convertTwitchGamesToGames(
  twitchGames: TopGamesResponse
): Game[] {
  const games: Game[] = twitchGames.data.map((tGame) => ({
    id: tGame.id,
    title: tGame.name,
    bannerUrl: tGame.box_art_url
      .replace('{width}', '285')
      .replace('{height}', '380'),
  }));

  return games;
}
