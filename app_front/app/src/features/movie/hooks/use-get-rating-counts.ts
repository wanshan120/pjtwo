import { useQuery } from 'react-query';

import getRatingCounts from 'features/movie/api/get-rating-counts';

const useGetRatingCounts = (movieId: string) => {
  const { data } = useQuery(['rating', movieId], () => getRatingCounts(movieId), {
    enabled: movieId.length >= 2,
    select: (d) => d?.data.rates,
  });

  return data;
};

export default useGetRatingCounts;
