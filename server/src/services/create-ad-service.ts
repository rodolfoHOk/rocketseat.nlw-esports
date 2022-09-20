import { Ad } from '@prisma/client';
import { AdDto, AdDtoModel } from '../dto/ad-dto';
import { GameIdDtoModel } from '../dto/game-id-dto';
import { ValidationError } from '../exceptions/ValidationError';
import { prisma } from '../prisma';
import { AuthenticateTwitchService } from '../twitch/authenticate-twitch-service';
import {
  GetTwitchGameByIdService,
  TwitchGameResponse,
} from '../twitch/get-twitch-game-by-id-service';
import { convertHourStringToMinutes } from '../utils/convert-hour-string-to-minutes';
import { convertTwitchGameToGame } from '../utils/convert-twitch-game-to-game';

export class CreateAdService {
  async execute(gameId: string, ad: AdDto): Promise<Ad> {
    const gameIdValidate = GameIdDtoModel.safeParse(gameId);

    if (gameIdValidate.success === false) {
      throw new ValidationError('gameId inválido');
    }

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });

    if (game === null) {
      const getTwitchGameByIdService = new GetTwitchGameByIdService();
      let twitchGameResponse: TwitchGameResponse;
      try {
        twitchGameResponse = await getTwitchGameByIdService.execute(gameId);
      } catch (err: any) {
        if (err.response && err.response.data.status === 401) {
          const authenticateTwitchService = new AuthenticateTwitchService();
          try {
            await authenticateTwitchService.execute();
            twitchGameResponse = await getTwitchGameByIdService.execute(gameId);
          } catch (e) {
            throw e;
          }
        } else {
          throw err;
        }
      }
      const gameToCreate = convertTwitchGameToGame(twitchGameResponse);
      await prisma.game.create({
        data: gameToCreate,
      });
    }

    const adValidate = AdDtoModel.safeParse(ad);

    if (adValidate.success === false) {
      throw new ValidationError(adValidate.error.message);
    }

    const createdAd = await prisma.ad.create({
      data: {
        gameId,
        name: ad.name,
        yearsPlaying: ad.yearsPlaying,
        weekDays: ad.weekDays.join(','),
        hourStart: convertHourStringToMinutes(ad.hourStart),
        hourEnd: convertHourStringToMinutes(ad.hourEnd),
        discord: ad.discord,
        useVoiceChannel: ad.useVoiceChannel,
      },
    });

    return createdAd;
  }
}
