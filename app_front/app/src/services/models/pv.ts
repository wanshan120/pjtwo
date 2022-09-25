import * as z from 'zod';

export const pv = z
  .object({
    serviceName: z.string(),
    url: z.string().url(),
  })
  .strict();

export type Pv = z.infer<typeof pv>;
