import { Request, Response } from 'express';
import { CountAdsByGameService } from '../services/count-ads-by-game-service';
import { AuthenticateTwitchService } from '../twitch/authenticate-twitch-service';
import {
  GetTwitchTopGamesService,
  TopGamesResponse,
} from '../twitch/get-twitch-top-games-service';
import { convertTwitchGamesToGames } from '../utils/convert-twitch-games-to-games';

export class ListTwitchTopGamesController {
  async handle(request: Request, response: Response) {
    const getTwitchTopGamesService = new GetTwitchTopGamesService();
    let topGamesResponse: TopGamesResponse;
    try {
      topGamesResponse = await getTwitchTopGamesService.execute();
    } catch (err: any) {
      if (err.response && err.response.data.status === 401) {
        const authenticateTwitchService = new AuthenticateTwitchService();
        try {
          await authenticateTwitchService.execute();
          topGamesResponse = await getTwitchTopGamesService.execute();
        } catch (e) {
          return response.status(500).json(e);
        }
      } else {
        return response.status(500).json(err);
      }
    }

    const topGames = convertTwitchGamesToGames(topGamesResponse);
    const countAdsByGame = new CountAdsByGameService();
    const topGamesWithCountAds = await Promise.all(
      topGames.map(async (game) => ({
        ...game,
        adsCount: await countAdsByGame.execute(game.id),
      }))
    );

    return response.json(topGamesWithCountAds);
  }
}
