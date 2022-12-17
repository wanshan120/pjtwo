import { useQuery } from 'react-query';

import getRelatedMovies from '../api/get-related-movie';
// import { Movie } from 'models/movie';

const useRelatedMovies = (tagId: string | undefined) => {
  const query = useQuery(['related-movies', tagId], () => getRelatedMovies(tagId), {
    enabled: !!tagId,
  });

  return query.data;
};

export default useRelatedMovies;
