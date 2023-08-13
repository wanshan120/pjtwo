import { useRef } from 'react';

import { ToastContainer } from 'react-toastify';
import ErrorBoundary from 'ErrorBoundary';
import Login from 'features/login/components/Login';
import 'react-toastify/dist/ReactToastify.css';

const LoginBoundary = () => {
  const ebKey = useRef(0);

  return (
    <ErrorBoundary
      statusMessages={{
        404: 'NotFound',
      }}
      onError={() => {
        ebKey.current += 1;
      }}
      key={ebKey.current}
    >
      <ToastContainer />
      <Login />
    </ErrorBoundary>
  );
};

export default LoginBoundary;
