import * as z from 'zod';
import { tag } from 'models/tag';

export const tags = z
  .object({
    id: z.string(),
    tags: z.array(tag).optional().nullable(),
  })
  .strict();

export type Tags = z.infer<typeof tags>;
