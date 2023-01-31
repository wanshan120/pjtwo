/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// React
import { SyntheticEvent, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
// My
import { verificationCodeSchema, VerificationCodeInput } from 'models/input-verification-code';
import { genericResponse } from 'models/generic-response';
import GetVerifyEmail from 'features/auth/api/get-verify-email';
// Plugin
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';

const usePostVerifyEmail = () => {
  const navigate = useNavigate();
  const { verificationCode } = useParams();
  const methods = useForm<VerificationCodeInput>({
    resolver: zodResolver(verificationCodeSchema),
  });

  // API Login Mutation
  const { mutate: verifyEmail, isLoading } = useMutation(
    (_verificationCode: string) => GetVerifyEmail(_verificationCode),
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        navigate('/verifyemail');
      },
      onError: (error: Error) => {
        try {
          console.log('on error');
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

  // 初期値をセット
  useEffect(() => {
    if (verificationCode) {
      reset({ verificationCode });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitHandler: SubmitHandler<VerificationCodeInput> = (input: VerificationCodeInput) => {
    // ? Executing the verifyEmail Mutation
    verifyEmail(input.verificationCode);
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

export default usePostVerifyEmail;
