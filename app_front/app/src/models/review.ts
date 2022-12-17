import * as z from 'zod';

export const review = z
  .object({
    id: z.string(),
    userId: z.string(),
    productId: z.string(),
    title: z.string().optional().nullable(),
    content: z.string().optional(),
    updatedAt: z.string().optional().nullable(),
  })
  .strict();

export type Review = z.infer<typeof review>;
