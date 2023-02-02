/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GenericResponse, genericResponse } from 'models/generic-response';
import { ZodError } from 'zod';
import { RegisterInput } from 'models/input-resister';
import { HTTPError } from 'ky';
import authClient from '../../../configs/ky-auth-client';

const postSignUpUser = async (inputdata: RegisterInput) => {
  try {
    const response = await authClient.post(`auth/register`, { json: inputdata });
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

export default postSignUpUser;
