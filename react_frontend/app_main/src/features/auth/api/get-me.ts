/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ZodError } from 'zod';
import { HTTPError } from 'ky';
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { IUserResponse, iUserResponse } from 'models/i-user-response';
import authClient from '../../../configs/ky-auth-client';
// import { ErrorResponse } from 'services/models/error-response';

const getMe = async (): Promise<IUserResponse | null> => {
  try {
    const response = await authClient.get('users/me', { credentials: 'include' });
    const json = await response.json();

    iUserResponse.parse(json);

    return json as IUserResponse;
  } catch (error) {
    if (error instanceof ZodError) {
      throw Error(error.message);
    }
    if (error instanceof HTTPError) {
      const serverMessage = await error.response.text();
      throw Error(serverMessage);
    }
  }

  return null;
};

export default getMe;
