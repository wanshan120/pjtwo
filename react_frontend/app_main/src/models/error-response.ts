import { z } from 'zod';
import { ToZod } from 'lib/zod';

export type ErrorResponse = {
  message: string;
};

export const errorResponseSchema = z.object<ToZod<ErrorResponse>>({
  message: z.string(),
});
