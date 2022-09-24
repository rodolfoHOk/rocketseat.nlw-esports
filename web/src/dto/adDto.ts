import { z } from 'zod';

export const AdDtoModel = z.object({
  game: z.string({ required_error: 'é obrigatório' }).min(1, 'é obrigatório'),
  name: z.string().min(2, 'deve ter ao menos 2 caracteres'),
  yearsPlaying: z
    .number({
      invalid_type_error: 'deve ser um número',
    })
    .int('deve ser um número inteiro')
    .min(0, 'deve ser maior ou igual a 0'),
  weekDays: z
    .array(
      z
        .string({
          invalid_type_error: 'dia deve ser uma string',
        })
        .length(1, 'dia deve ter um caractere apenas')
    )
    .min(1, 'deve ter ao menos um dia')
    .max(7, 'deve ter no máximo 7 dias'),
  hourStart: z
    .string()
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'deve ter o formato: HH:MM'),
  hourEnd: z
    .string()
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'deve ter o formato: HH:MM'),
  useVoiceChannel: z.boolean({
    required_error: 'é obrigatório',
    invalid_type_error: 'deve ser um booleano',
  }),
});

export type AdDto = z.infer<typeof AdDtoModel>;
