import { useQuery } from 'react-query';

import getMovie from 'features/movie/api/get-movie';

const useMovieDetail = (movieId: string) => {
  const { data: movie = [] } = useQuery(['movie', movieId], () => getMovie(movieId), {
    enabled: movieId.length >= 2,
  });

  return movie;
};

export default useMovieDetail;
