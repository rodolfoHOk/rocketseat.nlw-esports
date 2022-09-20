import { z } from 'zod';

export const AdDtoModel = z.object({
  name: z.string().min(2, 'name deve ter ao menos 2 caracteres'),
  yearsPlaying: z
    .number({
      invalid_type_error: 'yearsPlaying deve ser um número',
    })
    .int('yearsPlaying deve ser um número inteiro'),
  discord: z.string().min(6, 'discord de ter ao menos 6 caracteres'),
  weekDays: z
    .array(
      z
        .number({
          invalid_type_error: 'dia da semana deve ser um número',
        })
        .int('dia da semana deve ser um número inteiro de 0 a 6')
        .min(0, 'dia da semana deve ser no mínimo 0')
        .max(6, 'dia da semana deve ser no máximo 6')
    )
    .min(1, 'dias da semana de ter ao menos um dia')
    .max(7, 'dias da semana deve ter no máximo 7 dias'),
  hourStart: z
    .string()
    .regex(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      'hourStart deve ter o formato: HH:MM'
    ),
  hourEnd: z
    .string()
    .regex(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      'hourEnd deve ter o formato: HH:MM'
    ),
  useVoiceChannel: z.boolean({
    required_error: 'useVoiceChannel é obrigatório',
    invalid_type_error: 'useVoiceChannel deve ser um boolean',
  }),
});

export type AdDto = z.infer<typeof AdDtoModel>;
