import * as z from 'zod';

export const ratingCountsSchema = z.array(
  z
    .object({
      id: z.number(),
      count: z.number(),
    })
    .strict(),
);

export type RatingCounts = z.infer<typeof ratingCountsSchema>;
