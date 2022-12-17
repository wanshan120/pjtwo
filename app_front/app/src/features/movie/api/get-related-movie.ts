import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { RelatedMovies, relatedMoviesSchema } from 'models/related-movie';
import { ZodError } from 'zod';
// import { ErrorResponse } from 'services/models/error-response';

const getRelatedMovies = async (
  tagId: string | undefined,
  options?: Options,
): Promise<RelatedMovies> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };
  if (tagId) {
    const response = await ky.get(`movie/related/${tagId}`, mergedOptions);
    const json = await response.json();

    try {
      relatedMoviesSchema.parse(json);
    } catch (e) {
      if (e instanceof ZodError) {
        // const errorResponse: ErrorResponse = {
        //   message: '不正なクエリパラメータです。',
        // };
        // res.status(400).json(errorResponse);
        // console.log('レスポンス');
        // console.log(response.status);
        // console.log(response.statusText);
        console.log(e);
        throw Error('JSON parce error');
      }
    }

    return json as RelatedMovies;
  }
  console.log('tagId is undefined');
  throw Error('tagId is undefined');
};

export default getRelatedMovies;
