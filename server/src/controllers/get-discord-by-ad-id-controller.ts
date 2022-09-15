import { Request, Response } from 'express';
import { prisma } from '../prisma';

export class GetDiscordByAdIdController {
  async handle(request: Request, response: Response) {
    const adId = request.params.id;

    try {
      const ad = await prisma.ad.findUniqueOrThrow({
        select: {
          discord: true,
        },
        where: {
          id: adId,
        },
      });

      return response.json({
        discord: ad.discord,
      });
    } catch (e) {
      return response.status(404).json(e);
    }
  }
}
