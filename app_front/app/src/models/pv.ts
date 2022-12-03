import * as z from 'zod';

export const pv = z
  .object({
    serviceName: z.string(),
    url: z.string().url(),
    isMain: z.boolean(),
    updatedAt: z.date().optional(),
  })
  .strict();

export type Pv = z.infer<typeof pv>;
