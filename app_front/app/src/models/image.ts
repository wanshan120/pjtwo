import * as z from 'zod';

export const image = z
  .object({
    title: z.string().optional(),
    path: z.string().optional(),
    desc: z.string().optional(),
    isMain: z.boolean(),
    updatedAt: z.date().optional(),
  })
  .strict();

export type Image = z.infer<typeof image>;
