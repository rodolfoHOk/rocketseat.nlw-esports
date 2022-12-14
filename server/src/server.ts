import express from 'express';
import cors from 'cors';
import { ListTwitchTopGamesController } from './controllers/list-twitch-top-games-controller';
import { GetTwitchGameByIdController } from './controllers/get-twitch-game-by-id-controller';
import { CreateAdController } from './controllers/create-ad-controller';
import { ListAdsController } from './controllers/list-ads-controller';
import { ListAdsByGameIdController } from './controllers/list-ads-by-game-id-controller';
import { GetDiscordByAdIdController } from './controllers/get-discord-by-ad-id-controller';
import { oauthRouter } from './auth/routes/oauth-router';
import { ensureAuthenticated } from './auth/middlewares/ensure-authenticated';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/oauth', oauthRouter);

app.get('/games', new ListTwitchTopGamesController().handle);

app.get('/games/:id', new GetTwitchGameByIdController().handle);

app.post(
  '/games/:id/ads',
  ensureAuthenticated,
  new CreateAdController().handle
);

app.get('/games/:id/ads', new ListAdsByGameIdController().handle);

app.get('/ads', new ListAdsController().handle);

app.get(
  '/ads/:id/discord',
  ensureAuthenticated,
  new GetDiscordByAdIdController().handle
);

app.listen(3333, () => console.log('Server is running on port: 3333'));
