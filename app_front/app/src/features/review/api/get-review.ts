import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { Review, reviewSchema } from 'models/review';
import { ZodError } from 'zod';
// import { ErrorResponse } from 'services/models/error-response';

const getReview = async (contentId: string, options?: Options): Promise<Review> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };
  const response = await ky.get(`review/${contentId}`, mergedOptions);
  const json = await response.json();

  try {
    reviewSchema.parse(json);
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

  return json as Review;
};

export default getReview;
