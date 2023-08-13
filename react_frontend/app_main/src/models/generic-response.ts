import { z } from 'zod';

export const genericResponse = z
  .object({
    status: z.string(),
    message: z.string().optional(),
  })
  .strict();

export type GenericResponse = z.infer<typeof genericResponse>;
