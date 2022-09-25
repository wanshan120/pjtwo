import { useQuery } from 'react-query';

import getMovie from 'services/api/movie/get-movie';
// import getMembers from 'domains/github/services/get-members-delayed';

const useMovieDetail = (movieId: string) => {
  const { data: movie = [] } = useQuery([movieId, 'movie'], () => getMovie(movieId), {
    enabled: movieId.length >= 2,
  });

  return movie;
};

export default useMovieDetail;
