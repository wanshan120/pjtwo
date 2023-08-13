/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// React
import { SyntheticEvent, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
// My
import { loginSchema, LoginInput } from 'models/input-login';
import { genericResponse } from 'models/generic-response';
import { useStateContext } from 'context';
import postLoginUser from 'features/auth/api/post-login-user';
import getMe from 'features/auth/api/get-me';
// Plugin
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';

const usePostLoginUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as string) || '/';
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const stateContext = useStateContext();

  // API Get Current Logged-in user
  const query = useQuery(['authUser'], getMe, {
    enabled: false,
    select: (data) => data?.data.user || null,
    retry: 1,
    onSuccess: (data) => {
      stateContext.dispatch({ type: 'SET_USER', payload: data });
    },
  });

  // API Login Mutation
  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginInput) => postLoginUser(userData),
    {
      onSuccess: async () => {
        await query.refetch();
        toast.success('ログインに成功しました', { hideProgressBar: true });
        navigate(from);
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
    },
  );
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    // ? Executing the loginUser Mutation
    loginUser(values);
  };

  // Promise処理ラッパー
  const onPromise =
    <T extends unknown>(promise: (event: SyntheticEvent) => Promise<T>) =>
    (event: SyntheticEvent) => {
      if (promise) {
        promise(event).catch((error) => {
          toast.error(String(error), {
            position: 'top-right',
          });
        });
      }
    };

  return { methods, handleSubmit, onSubmitHandler, onPromise, isLoading };
};

export default usePostLoginUser;
