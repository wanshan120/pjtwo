import { ZodError } from 'zod';
import { HTTPError } from 'ky';
import { RelatedMoviesResponse, relatedMoviesResponse } from 'models/related-movie-response';

import authClient from 'configs/ky-auth-client';

const getRelatedMovies = async (
  tagId: string | undefined,
): Promise<RelatedMoviesResponse | null> => {
  try {
    if (tagId) {
      const response = await authClient.get(`movie/related/${tagId}`);
      const json = await response.json();
      relatedMoviesResponse.parse(json);

      return json as RelatedMoviesResponse;
    }

    return null;
  } catch (error) {
    if (error instanceof ZodError) {
      throw Error(error.message);
    }
    if (error instanceof HTTPError) {
      const serverMessage = await error.response.text();
      throw Error(serverMessage);
    }
  }

  return null;
};

export default getRelatedMovies;
