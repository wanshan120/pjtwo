import * as z from 'zod';

export const jwt = z
  .object({
    token: z.string(),
  })
  .strict();

export type Jwt = z.infer<typeof jwt>;
