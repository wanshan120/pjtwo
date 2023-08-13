/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// React
import { SyntheticEvent, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
// My
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from 'models/input-resister';
import { genericResponse } from 'models/generic-response';
import postSignUpUser from 'features/auth/api/post-sign-up-user';
// Plugin

const usePostSignUpUser = () => {
  const navigate = useNavigate();

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  // API Login Mutation
  const { mutate: loginUser, isLoading } = useMutation(
    (userData: RegisterInput) => postSignUpUser(userData),
    {
      onSuccess: () => {
        toast.success('続いてメールアドレスの認証を行ってください', {
          position: 'top-right',
        });
        // navigate('/verifyemail');  Note: create verifyEmail
        navigate('/login');
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

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
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

  return {
    methods,
    handleSubmit,
    onSubmitHandler,
    onPromise,
    isLoading,
  };
};

export default usePostSignUpUser;
