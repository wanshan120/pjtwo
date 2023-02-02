import { useQuery } from 'react-query';
import getMovie from 'features/movie/api/get-movie';

const useMovieDetail = (movieId: string) => {
  const query = useQuery(['movie', movieId], () => getMovie(movieId), {
    enabled: movieId.length >= 2,
  });

  return query.data;
};

export default useMovieDetail;
