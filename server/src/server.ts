import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';
import { GetTwitchTopGamesService } from './twitch/get-twitch-top-games-service';
import { AuthenticateTwitchService } from './twitch/authenticate-twitch-service';
import { convertTwitchGamesToGames } from './utils/convert-twitch-games-to-games';
import { GetTwitchGameByIdService } from './twitch/get-twitch-game-by-id-service';
import { convertTwitchGameToGame } from './utils/convert-twitch-game-to-game';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ['query'],
});

app.get('/games', async (request, response) => {
  const getTwitchTopGamesService = new GetTwitchTopGamesService();
  try {
    const topGamesResponse = await getTwitchTopGamesService.execute();
    return response.json(convertTwitchGamesToGames(topGamesResponse));
  } catch (err: any) {
    if (err.response.data.status === 401) {
      const authenticateTwitchService = new AuthenticateTwitchService();
      try {
        await authenticateTwitchService.execute();
        const topGamesResponse = await getTwitchTopGamesService.execute();
        return response.json(convertTwitchGamesToGames(topGamesResponse));
      } catch (e: any) {
        return response.status(500).json(e.response.data);
      }
    } else {
      return response.status(500).json(err.response.data);
    }
  }
});

app.get('/games/:id', async (request, response) => {
  const { id } = request.params;
  const getTwitchGameByIdService = new GetTwitchGameByIdService();
  try {
    const twitchGameResponse = await getTwitchGameByIdService.execute(id);
    return response.json(convertTwitchGameToGame(twitchGameResponse));
  } catch (err: any) {
    if (err.response.data.status === 401) {
      const authenticateTwitchService = new AuthenticateTwitchService();
      try {
        await authenticateTwitchService.execute();
        const twitchGameResponse = await getTwitchGameByIdService.execute(id);
        return response.json(convertTwitchGameToGame(twitchGameResponse));
      } catch (e: any) {
        return response.status(500).json(e.response.data);
      }
    } else {
      return response.status(500).json(err.response.data);
    }
  }
});

app.get('/ads', async (request, response) => {
  const ads = await prisma.ad.findMany();

  return response.json(ads);
});

app.post('/games/:id/ads', async (request, response) => {
  const gameId: any = request.params.id;
  const body: any = request.body;

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });

  if (game === null) {
    const getTwitchGameByIdService = new GetTwitchGameByIdService();
    try {
      const twitchGameResponse = await getTwitchGameByIdService.execute(gameId);
      const gameToCreate = convertTwitchGameToGame(twitchGameResponse);
      await prisma.game.create({
        data: gameToCreate,
      });
    } catch (err: any) {
      if (err.response.data.status === 401) {
        const authenticateTwitchService = new AuthenticateTwitchService();
        try {
          await authenticateTwitchService.execute();
          const twitchGameResponse = await getTwitchGameByIdService.execute(
            gameId
          );
          const gameToCreate = convertTwitchGameToGame(twitchGameResponse);
          await prisma.game.create({
            data: gameToCreate,
          });
        } catch (e: any) {
          return response.status(500).json(e.response.data);
        }
      } else {
        return response.status(500).json(err.response.data);
      }
    }
  }

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      discord: body.discord,
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.status(201).json(ad);
});

app.get('/games/:id/ads', async (request, response) => {
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
});

app.get('/ads/:id/discord', async (request, response) => {
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
    return response.status(404).send();
  }
});

app.listen(3333, () => console.log('Server is running on port: 3333'));
