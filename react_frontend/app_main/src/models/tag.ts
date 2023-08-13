import * as z from 'zod';

export const tag = z
  .object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
    controlType: z.string(),
    status: z.string(),
    desc: z.string().optional(),
  })
  .strict();

export type Tag = z.infer<typeof tag>;
