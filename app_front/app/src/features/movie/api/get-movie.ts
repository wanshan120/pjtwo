import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { Movie, movieSchema } from 'models/movie';
import { ZodError } from 'zod';
import { HTTPError } from 'ky';

import authClient from 'configs/ky-auth-client';

const getMovie = async (movieId: string): Promise<Movie | null> => {
  try {
    const response = await authClient.get(`movie/${movieId}`);
    const json = await response.json();
    movieSchema.parse(json);

    return json as Movie;
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

export default getMovie;
