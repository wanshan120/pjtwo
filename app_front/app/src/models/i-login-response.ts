import { z } from 'zod';

export const iLoginResponse = z
  .object({
    status: z.string(),
    accessToken: z.string(),
  })
  .strict();

export type ILoginResponse = z.infer<typeof iLoginResponse>;
