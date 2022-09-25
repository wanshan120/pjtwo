import * as z from 'zod';

import { image } from 'services/models/image';
import { rate } from 'services/models/rate';
import { pv } from 'services/models/pv';
import { tag } from 'services/models/tag';

export const movieSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    contentType: z.string(),
    rates: z.array(rate).optional().nullable(),
    images: z.array(image).optional().nullable(),
    pvs: z.array(pv).optional().nullable(),
    summary: z.string().optional().nullable(),
    tags: z.array(tag).optional().nullable(),
  })
  .strict();

export type Movie = z.infer<typeof movieSchema>;
