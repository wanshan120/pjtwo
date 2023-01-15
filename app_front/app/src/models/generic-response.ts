import { z } from 'zod';

export const genericResponse = z
  .object({
    status: z.string(),
    message: z.string(),
  })
  .strict();

export type GenericResponse = z.infer<typeof genericResponse>;
