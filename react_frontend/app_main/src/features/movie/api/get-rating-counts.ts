import { ZodError } from 'zod';
import { HTTPError } from 'ky';
import authClient from 'configs/ky-auth-client';
import { RatingCountResponse, ratingCountResponse } from 'models/rating-counts-response';

const getRatingCounts = async (movieId: string): Promise<RatingCountResponse | null> => {
  try {
    const response = await authClient.get(`rate/${movieId}`);
    const json = await response.json();
    ratingCountResponse.parse(json);

    return json as RatingCountResponse;
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

export default getRatingCounts;
