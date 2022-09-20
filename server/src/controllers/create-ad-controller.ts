import { Ad } from '@prisma/client';
import { Request, Response } from 'express';
import { AdDto } from '../dto/ad-dto';
import { ValidationError } from '../exceptions/ValidationError';
import { CreateAdService } from '../services/create-ad-service';

export class CreateAdController {
  async handle(request: Request, response: Response) {
    const gameId: any = request.params.id;
    const body: AdDto = request.body;

    let createdAd: Ad;
    try {
      createdAd = await new CreateAdService().execute(gameId, body);
    } catch (err) {
      if (err instanceof ValidationError) {
        return response.status(400).json(JSON.parse(err.message));
      } else {
        return response.status(500).json(err);
      }
    }

    return response.status(201).json(createdAd);
  }
}
