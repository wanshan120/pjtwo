/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, Suspense, lazy } from 'react';

import { ToastContainer } from 'react-toastify';
import ErrorBoundary from 'ErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';
import FullScreenLoader from 'components/loader/FullScreenLoader';

const VerifyEmailPage = () => {
  const ebKey = useRef(0);

  const Loadable = (Component: React.ComponentType<any>) =>
    // eslint-disable-next-line react/no-unstable-nested-components, prefer-arrow/prefer-arrow-functions, func-names
    function (props: JSX.IntrinsicAttributes) {
      return (
        <Suspense fallback={<FullScreenLoader />}>
          <Component {...props} />
        </Suspense>
      );
    };

  const Page = Loadable(lazy(() => import('features/auth/components/VerifyEmail')));

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
      <Page />
    </ErrorBoundary>
  );
};

export default VerifyEmailPage;
