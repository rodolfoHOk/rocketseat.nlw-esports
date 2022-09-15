import { Request, Response } from 'express';
import { prisma } from '../prisma';

export class ListAdsController {
  async handle(request: Request, response: Response) {
    const ads = await prisma.ad.findMany();

    return response.json(ads);
  }
}
