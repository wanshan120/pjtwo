import { useRef } from 'react';

import ErrorBoundary from 'ErrorBoundary';
import SignUp from 'features/auth/components/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
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
      <ToastContainer />
      <SignUp />
    </ErrorBoundary>
  );
};

export default SignUpPage;
