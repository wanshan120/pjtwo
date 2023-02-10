import { z } from 'zod';
import { movieSchema } from './movie';

export const movieResponse = z
  .object({
    status: z.string(),
    data: z.object({
      movie: movieSchema,
    }),
  })
  .strict();

export type MovieResponse = z.infer<typeof movieResponse>;
