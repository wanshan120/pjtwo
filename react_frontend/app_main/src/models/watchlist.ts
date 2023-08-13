import * as z from 'zod';

export const watchlist = z
  .object({
    id: z.string(),
    userId: z.string(),
    productId: z.string(),
    createdAt: z.string().optional().nullable(),
  })
  .strict();

export type Watchlist = z.infer<typeof watchlist>;

export const watchlistResponse = z
  .object({
    status: z.string(),
    data: z
      .object({
        watchlist,
      })
      .nullable(),
  })
  .strict();

export type WatchlistResponse = z.infer<typeof watchlistResponse>;
