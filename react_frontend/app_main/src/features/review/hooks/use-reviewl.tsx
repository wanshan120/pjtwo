import { useQuery } from 'react-query';

import getReview from 'features/review/api/get-review';

// import { Movie } from 'models/movie';

const useReview = (productId: string) => {
  const query = useQuery(['review', productId], () => getReview(productId), {
    enabled: productId.length >= 2,
  });

  return query.data;
};

export default useReview;
