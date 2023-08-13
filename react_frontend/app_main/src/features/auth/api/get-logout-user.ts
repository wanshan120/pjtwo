/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ZodError } from 'zod';
import { HTTPError } from 'ky';
// import { GenericResponse, genericResponse } from 'models/generic-response';
import { GenericResponse, genericResponse } from 'models/generic-response';
import authClient from '../../../configs/ky-auth-client';

const GetLogoutUser = async (): Promise<GenericResponse | null> => {
  try {
    const response = await authClient.get('auth/logout');
    const json = await response.json();
    genericResponse.parse(json);

    return json as GenericResponse;
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

export default GetLogoutUser;
