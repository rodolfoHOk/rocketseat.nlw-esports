import { Request, Response } from 'express';
import { AuthenticateTwitchService } from '../twitch/authenticate-twitch-service';
import {
  GetTwitchGameByIdService,
  TwitchGameResponse,
} from '../twitch/get-twitch-game-by-id-service';
import { convertTwitchGameToGame } from '../utils/convert-twitch-game-to-game';

export class GetTwitchGameByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const getTwitchGameByIdService = new GetTwitchGameByIdService();
    let twitchGameResponse: TwitchGameResponse;
    try {
      twitchGameResponse = await getTwitchGameByIdService.execute(id);
    } catch (err: any) {
      if (err.response && err.response.data.status === 401) {
        const authenticateTwitchService = new AuthenticateTwitchService();
        try {
          await authenticateTwitchService.execute();
          twitchGameResponse = await getTwitchGameByIdService.execute(id);
        } catch (e) {
          return response.status(500).json(e);
        }
      } else {
        return response.status(500).json(err);
      }
    }

    return response.json(convertTwitchGameToGame(twitchGameResponse));
  }
}
