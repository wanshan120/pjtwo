/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// React
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
// My
import { toast } from 'react-toastify';
import { genericResponse } from 'models/generic-response';
import GetLogoutUser from 'features/auth/api/get-logout-user';
import { urlPatterns } from 'urlPatterns';

// Plugin

const useGetLogoutUser = () => {
  const navigate = useNavigate();

  // API Login Mutation
  const { mutate: logoutUser, isLoading } = useMutation(() => GetLogoutUser(), {
    onSuccess: (data) => {
      toast.success(data?.message);
      navigate(urlPatterns.login.path);
    },
    onError: (error: Error) => {
      try {
        const e = genericResponse.parse(JSON.parse(error.message));
        toast.error(e.message, {
          position: 'top-right',
        });
      } catch (err) {
        toast.error('サーバーエラー', {
          position: 'top-right',
        });
      }
    },
  });

  const onLogoutHandler = () => {
    logoutUser();
  };

  return { onLogoutHandler, isLoading };
};

export default useGetLogoutUser;
