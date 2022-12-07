import * as z from 'zod';

export const site = z
  .object({
    name: z.string(),
    icon: z.string().url(),
  })
  .strict();

export type Site = z.infer<typeof site>;
