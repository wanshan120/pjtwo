import { useQuery } from 'react-query';

import postJwt from 'features/login/api/post-jwt';
import { UserLogin } from 'models/user-login';

const usePostJwt = (user: UserLogin) => {
  const { data } = useQuery(
    ['token'],
    () =>
      postJwt({
        json: {
          user,
        },
      }),
    {
      enabled: true,
    },
  );

  return { data };
};

export default usePostJwt;
