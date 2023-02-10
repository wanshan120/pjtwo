import { useQuery } from 'react-query';
import getMovie from 'features/movie/api/get-movie';

const useMovieDetail = (movieId: string) => {
  const { data } = useQuery(['movie', movieId], () => getMovie(movieId), {
    enabled: movieId.length >= 2,
    select: (d) => d?.data.movie || null,
  });

  return data;
};

export default useMovieDetail;
