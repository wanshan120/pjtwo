import { z } from 'zod';
import { ratingCountsSchema } from './rating-counts';

export const ratingCountResponse = z
  .object({
    status: z.string(),
    data: z.object({
      rates: ratingCountsSchema,
    }),
  })
  .strict();

export type RatingCountResponse = z.infer<typeof ratingCountResponse>;
