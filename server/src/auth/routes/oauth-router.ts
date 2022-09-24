import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/authenticate-user-controller';
import { GetAuthUserInfosController } from '../controllers/get-auth-user-infos-controller';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';

export const oauthRouter = Router();

oauthRouter.post('/login', new AuthenticateUserController().handle);

oauthRouter.get(
  '/user',
  ensureAuthenticated,
  new GetAuthUserInfosController().handle
);
