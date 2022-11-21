import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import ErrorBoundary from 'ErrorBoundary';
import PageDetailMovie from 'features/movie/components/DetailMovie';

const PageDetailMovieBoundary = () => {
  const { movieId = '' } = useParams();
  const ebKey = useRef(0);

  return (
    <ErrorBoundary
      statusMessages={{
        404: `‘${movieId}’というコードの組織は見つかりません`,
      }}
      onError={() => {
        ebKey.current += 1;
      }}
      key={ebKey.current}
    >
      <PageDetailMovie movieId={movieId} />
    </ErrorBoundary>
  );
};

export default PageDetailMovieBoundary;
