import * as z from 'zod';

export const rate = z
  .object({
    serviceName: z.string(),
    rateValue: z.number(),
  })
  .strict();

export type Rate = z.infer<typeof rate>;
