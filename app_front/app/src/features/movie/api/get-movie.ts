import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { Movie, movieSchema } from 'models/movie';
import { ZodError } from 'zod';
// import { ErrorResponse } from 'services/models/error-response';

const getMovie = async (movieId: string, options?: Options): Promise<Movie[] | unknown> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };
  const response = await ky.get(`movie/${movieId}`, mergedOptions);
  const json = await response.json();

  try {
    movieSchema.parse(json);
  } catch (e) {
    if (e instanceof ZodError) {
      // const errorResponse: ErrorResponse = {
      //   message: '不正なクエリパラメータです。',
      // };
      // res.status(400).json(errorResponse);
      console.log('レスポンス');
      console.log(response.status);
      console.log(response.statusText);
      console.log(e);
      // throw Error('API type error');
    }
  }
  // if (!movieSchema(movie)) {
  //   throw Error('API type error');
  // }

  return json;
};

export default getMovie;
