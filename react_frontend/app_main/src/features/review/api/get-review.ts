import ky, { Options } from 'ky';
import { ZodError } from 'zod';
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { Review, review } from 'models/review';
// import { ErrorResponse } from 'services/models/error-response';

const getReview = async (productId: string, options?: Options): Promise<Review> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };
  const response = await ky.get(`review/${productId}`, mergedOptions);
  const json = await response.json();

  try {
    review.parse(json);
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
