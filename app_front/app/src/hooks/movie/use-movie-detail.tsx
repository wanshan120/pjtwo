import { useQuery } from 'react-query';

import getMovie from 'services/api/movie/get-movie';
// import getMembers from 'domains/github/services/get-members-delayed';

const useMovieDetail = (orgCode: string) => {
  const { data: movie = [] } = useQuery([orgCode, 'movie'], () => getMovie(orgCode), {
    enabled: orgCode.length >= 2,
  });

  return movie;
};

export default useMovieDetail;
