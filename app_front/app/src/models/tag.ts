import * as z from 'zod';

export const tag = z
  .object({
    name: z.string(),
    category: z.string(),
    type: z.string(),
    status: z.string(),
    desc: z.string().optional(),
  })
  .strict();

export type Tag = z.infer<typeof tag>;
