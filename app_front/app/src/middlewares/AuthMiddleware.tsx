import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import getMe from 'features/auth/api/get-me';
import { useStateContext } from 'context';
import FullScreenLoader from 'components/loader/FullScreenLoader';
import React from 'react';

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const [cookies] = useCookies(['logged_in']);
  const stateContext = useStateContext();
  const query = useQuery(['authUser'], () => getMe(), {
    enabled: !!cookies.logged_in,
    select: (data) => data?.data.user || null,
    onSuccess: (data) => {
      stateContext.dispatch({ type: 'SET_USER', payload: data });
    },
  });

  if (query.isLoading && cookies.logged_in) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
