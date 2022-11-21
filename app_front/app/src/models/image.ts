import * as z from 'zod';

export const image = z
  .object({
    title: z.string().optional(),
    path: z.string().optional(),
    desc: z.string().optional(),
  })
  .strict();

export type Image = z.infer<typeof image>;
