import { useQuery } from 'react-query';

import getReview from 'features/review/api/get-review';

// import { Movie } from 'models/movie';

const useReview = (contentId: string) => {
  const query = useQuery(['review', contentId], () => getReview(contentId), {
    enabled: contentId.length >= 2,
  });

  return query.data;
};

export default useReview;
