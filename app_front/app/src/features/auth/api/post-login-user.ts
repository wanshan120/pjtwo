/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ILoginResponse, iLoginResponse } from 'models/i-login-response';
import { ZodError } from 'zod';
import { LoginInput } from 'models/input-login';
import { HTTPError } from 'ky';
import authClient from '../../../configs/ky-auth-client';

const postLoginUser = async (inputdata: LoginInput) => {
  try {
    const response = await authClient.post(`auth/login`, {
      json: inputdata,
    });
    const json = await response.json();
    iLoginResponse.parse(json);

    return json as ILoginResponse;
  } catch (error) {
    if (error instanceof ZodError) {
      throw Error('サーバーエラー');
    }
    if (error instanceof HTTPError) {
      const serverMessage = await error.response.text();
      throw Error(serverMessage);
    }
  }
};

export default postLoginUser;
