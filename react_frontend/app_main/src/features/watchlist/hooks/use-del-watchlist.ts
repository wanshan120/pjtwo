import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import deleteWatchlist from '../api/delete-watchlist';
import getWatchlist from '../api/get-watchlist';

// import useFindoneWatchlist from './use-findone-watchlist';

const useDelWatchlist = (productId: string) => {
  // initial data
  const query = useQuery(['watchList', productId], () => getWatchlist(productId), {
    select: (d) => d?.data?.watchlist,
  });

  // 削除
  const {
    mutate: onDeleteHandler,
    isLoading,
    isError,
  } = useMutation(() => deleteWatchlist(productId), {
    onSuccess: async () => {
      await query.refetch();
      toast.success('[後で見る]リストから削除しました', { hideProgressBar: true });
    },
    onError: () => {
      toast.error('[後で見る]リストから削除できませんでした', { hideProgressBar: true });
    },
  });

  return { onDeleteHandler, isLoading, isError };
};

export default useDelWatchlist;
