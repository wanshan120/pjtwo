import { useRef } from 'react';

import ErrorBoundary from 'ErrorBoundary';
import Login from 'features/login/components/Login';

const LoginBoundary = () => {
  const ebKey = useRef(0);

  return (
    <ErrorBoundary
      statusMessages={{
        404: `NotFound`,
      }}
      onError={() => {
        ebKey.current += 1;
      }}
      key={ebKey.current}
    >
      <Login />
    </ErrorBoundary>
  );
};

export default LoginBoundary;
