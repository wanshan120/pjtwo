/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { IUserResponse, iUserResponse } from 'models/i-user-response';
import { ZodError } from 'zod';
import authClient from './ky-auth-crient';
// import { ErrorResponse } from 'services/models/error-response';

const getMe = async (options?: Options): Promise<IUserResponse> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };

  const response = await authClient.get(`auth/logout`, mergedOptions);
  const json = await response.json();

  try {
    iUserResponse.parse(json);
  } catch (e) {
    if (e instanceof ZodError) {
      throw Error('JSON parce error');
    }
  }

  return json as IUserResponse;
};

export default getMe;
