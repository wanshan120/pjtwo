import * as z from 'zod';

export const pv = z
  .object({
    serviceName: z.string(),
    url: z.string().url(),
    isMain: z.boolean(),
    updatedAt: z.string().optional().nullable(),
  })
  .strict();

export type Pv = z.infer<typeof pv>;
