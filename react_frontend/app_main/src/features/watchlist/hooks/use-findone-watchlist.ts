import { useQuery } from 'react-query';
import getWatchlist from '../api/get-watchlist';

const useFindoneWatchlist = (productId: string) => {
  const { data, isFetched } = useQuery(['watchList', productId], () => getWatchlist(productId), {
    select: (d) => d?.data?.watchlist,
  });

  return { data, isFetched };
};

export default useFindoneWatchlist;
