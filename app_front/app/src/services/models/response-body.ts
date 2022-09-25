import * as z from 'zod';

export const responseBaseSchema = z
  .object({
    status: z.number(),
    message: z.string(),
    // data: z.object(z.object({data: a})),
  })
  .strict();

export type ResponseBase = z.infer<typeof responseBaseSchema>;
