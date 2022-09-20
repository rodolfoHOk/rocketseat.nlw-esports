import { z } from 'zod';

export const GameIdDtoModel = z.string().min(1, 'gameId não pode ser vazio');

export type GameIdDto = z.infer<typeof GameIdDtoModel>;
