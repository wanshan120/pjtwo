import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { RatingCounts, ratingCountsSchema } from 'models/rating-counts';
import { ZodError } from 'zod';
// import { ErrorResponse } from 'services/models/error-response';

const getRatingCounts = async (movieId: string, options?: Options): Promise<RatingCounts> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };
  const response = await ky.get(`rate/${movieId}`, mergedOptions);
  const json = await response.json();

  try {
    ratingCountsSchema.parse(json);
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

  console.log(json);

  return json as RatingCounts;
};

export default getRatingCounts;
