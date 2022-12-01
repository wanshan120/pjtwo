import { useQuery } from 'react-query';

import getRatingCounts from 'features/movie/api/get-rating-counts';

const useGetRatingCounts = (movieId: string) => {
  const query = useQuery(['rating', movieId], () => getRatingCounts(movieId), {
    enabled: movieId.length >= 2,
  });

  return query.data;
};

export default useGetRatingCounts;
