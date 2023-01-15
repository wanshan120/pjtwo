import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import getMe from 'features/auth/api/get-me';
import { useStateContext } from 'context';
import FullScreenLoader from 'components/loader/FullScreenLoader';

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies] = useCookies(['logged_in']);
  const location = useLocation();
  const stateContext = useStateContext();

  const {
    isLoading,
    isFetching,
    data: user,
  } = useQuery(['authUser'], getMe, {
    retry: 1,
    select: (data) => data.data.user,
    onSuccess: (data) => {
      stateContext.dispatch({ type: 'SET_USER', payload: data });
    },
  });

  const loading = isLoading || isFetching;

  if (loading) {
    return <FullScreenLoader />;
  }

  // 許可
  if ((cookies.logged_in || user) && allowedRoles.includes(user?.role as string)) {
    return <Outlet />;
  }
  // 拒否
  if (cookies.logged_in && user) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Navigate to="login" state={{ from: location }} replace />;
};

export default RequireUser;
