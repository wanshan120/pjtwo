import { z } from 'zod';
import { relatedMoviesSchema } from './related-movie';

export const relatedMoviesResponse = z
  .object({
    status: z.string(),
    data: z.object({
      movies: relatedMoviesSchema,
    }),
  })
  .strict();

export type RelatedMoviesResponse = z.infer<typeof relatedMoviesResponse>;
