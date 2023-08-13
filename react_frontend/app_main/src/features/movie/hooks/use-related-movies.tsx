import { useQuery } from 'react-query';

import getRelatedMovies from '../api/get-related-movie';
// import { Movie } from 'models/movie';

const useRelatedMovies = (tagId: string | undefined) => {
  const { data } = useQuery(['related-movies', tagId], () => getRelatedMovies(tagId), {
    enabled: !!tagId,
    select: (d) => d?.data.movies || null,
  });

  return data;
};

export default useRelatedMovies;
