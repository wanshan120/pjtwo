/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from 'zod';

export type ToZod<T extends Record<string, any>> = {
  [K in keyof T]-?: z.ZodType<T[K]>;
};
