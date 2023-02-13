import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import postWatchlist from '../api/post-watchlist';
import getWatchlist from '../api/get-watchlist';

const useAddWatchlist = (productId: string) => {
  // initial data
  const query = useQuery(['watchList', productId], () => getWatchlist(productId), {
    select: (d) => d?.data?.watchlist,
  });

  // 作成
  const {
    mutate: onCreateHandler,
    isLoading,
    isError,
  } = useMutation(() => postWatchlist(productId), {
    onSuccess: async () => {
      await query.refetch();
      toast.success('[後で見る]リストに追加しました', { hideProgressBar: true });
    },
    onError: () => {
      toast.error('[後で見る]に追加できませんでした', { hideProgressBar: true });
    },
  });

  return { onCreateHandler, isLoading, isError };
};

export default useAddWatchlist;
