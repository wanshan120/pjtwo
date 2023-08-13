import * as z from 'zod';

export const userLogin = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .strict();

export type UserLogin = z.infer<typeof userLogin>;
