import * as z from 'zod';

export const reviewSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    contentId: z.string(),
    title: z.string().optional().nullable(),
    content: z.string().optional().nullable(),
    updatedAt: z.string().optional().nullable(),
  })
  .strict();

export type Review = z.infer<typeof reviewSchema>;
