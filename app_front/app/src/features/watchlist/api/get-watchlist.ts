import { WatchlistResponse, watchlistResponse } from 'models/watchlist';
import { ZodError } from 'zod';
import { HTTPError } from 'ky';

import authClient from 'configs/ky-auth-client';

const getWatchlist = async (productId: string): Promise<WatchlistResponse | null> => {
  try {
    const response = await authClient.get(`watchlist/${productId}`);
    const json = await response.json();
    watchlistResponse.parse(json);

    return json as WatchlistResponse;
  } catch (error) {
    if (error instanceof ZodError) {
      throw Error(error.message);
    }
    if (error instanceof HTTPError) {
      const serverMessage = await error.response.text();
      throw Error(serverMessage);
    } else {
      throw error;
    }
  }

  return null;
};

export default getWatchlist;
