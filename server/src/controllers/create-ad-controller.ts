import { Ad } from '@prisma/client';
import { Request, Response } from 'express';
import { CreateAdDto, CreateAdService } from '../services/create-ad-service';

export class CreateAdController {
  async handle(request: Request, response: Response) {
    const gameId: any = request.params.id;
    const body: CreateAdDto = request.body;

    let createdAd: Ad;
    try {
      createdAd = await new CreateAdService().execute(gameId, body);
    } catch (err) {
      return response.status(500).json(err);
    }

    return response.status(201).json(createdAd);
  }
}
