import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { convertMinutesToHourString } from '../utils/convert-minutes-to-hour-string';

export class ListAdsByGameIdController {
  async handle(request: Request, response: Response) {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        hourStart: true,
        hourEnd: true,
        yearsPlaying: true,
        useVoiceChannel: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return response.json(
      ads.map((ad) => {
        return {
          ...ad,
          weekDays: ad.weekDays.split(','),
          hourStart: convertMinutesToHourString(ad.hourStart),
          hourEnd: convertMinutesToHourString(ad.hourEnd),
        };
      })
    );
  }
}
