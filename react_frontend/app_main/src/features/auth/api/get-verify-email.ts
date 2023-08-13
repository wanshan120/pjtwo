/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ZodError } from 'zod';
import { HTTPError } from 'ky';
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { GenericResponse, genericResponse } from 'models/generic-response';
import authClient from '../../../configs/ky-auth-client';
// import { ErrorResponse } from 'services/models/error-response';

const GetVerifyEmail = async (verificationCode: string) => {
  try {
    const response = await authClient.get(`auth/verifyemail/${verificationCode}`);
    const json = await response.json();

    genericResponse.parse(json);

    return json as GenericResponse;
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

export default GetVerifyEmail;
