import * as z from 'zod';

import { image } from 'models/image';
import { rate } from 'models/rate';
import { tag } from 'models/tag';
import { review } from 'models/review';

const relatedMovieSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    contentType: z.string(),
    publicationDate: z.string().optional().nullable(),
    rates: z.array(rate).optional().nullable(),
    image,
    tags: z.array(tag).optional().nullable(),
    review,
  })
  .strict();

// type RelatedMovie = z.infer<typeof relatedMovieSchema>;

export const relatedMoviesSchema = z.array(relatedMovieSchema);
export type RelatedMovies = z.infer<typeof relatedMoviesSchema>;
