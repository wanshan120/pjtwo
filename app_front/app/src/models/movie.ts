import * as z from 'zod';

import { image } from 'models/image';
import { rate } from 'models/rate';
import { pv } from 'models/pv';
import { tag } from 'models/tag';
import { planning } from 'models/planning';

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
    plannings: z.array(planning).optional().nullable(),
  })
  .strict();

export type Movie = z.infer<typeof movieSchema>;
