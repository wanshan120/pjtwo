import { MovieResponse, movieResponse } from 'models/movie-response';
import { ZodError } from 'zod';
import { HTTPError } from 'ky';

import authClient from 'configs/ky-auth-client';

const getMovie = async (movieId: string): Promise<MovieResponse | null> => {
  try {
    const response = await authClient.get(`movie/${movieId}`);
    const json = await response.json();
    movieResponse.parse(json);

    return json as MovieResponse;
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
