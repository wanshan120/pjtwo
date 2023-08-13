import { WatchlistResponse } from 'models/watchlist';
import { HTTPError } from 'ky';

import authClient from 'configs/ky-auth-client';

const deleteWatchlist = async (productId: string): Promise<WatchlistResponse | null> => {
  try {
    await authClient.delete(`watchlist/${productId}`);
  } catch (error) {
    if (error instanceof HTTPError) {
      const serverMessage = await error.response.text();
      throw Error(serverMessage);
    } else {
      throw error;
    }
  }

  return null;
};

export default deleteWatchlist;
