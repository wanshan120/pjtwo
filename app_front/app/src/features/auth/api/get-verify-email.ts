/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { GenericResponse, genericResponse } from 'models/generic-response';
import { ZodError } from 'zod';
import { HTTPError } from 'ky';
import authClient from './ky-auth-crient';
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
