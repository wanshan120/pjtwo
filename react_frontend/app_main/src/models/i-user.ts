import { z } from 'zod';

export const iUser = z
  .object({
    name: z.string(),
    email: z.string(),
    role: z.string(),
    id: z.string(),
    createdAt: z.string().optional().nullable(),
    updatedAt: z.string().optional().nullable(),
  })
  .strict();

export type IUser = z.infer<typeof iUser>;
