import { z } from 'zod';
import { iUser } from './i-user';

export const iUserResponse = z
  .object({
    status: z.string(),
    data: z.object({
      user: iUser,
    }),
  })
  .strict();

export type IUserResponse = z.infer<typeof iUserResponse>;
