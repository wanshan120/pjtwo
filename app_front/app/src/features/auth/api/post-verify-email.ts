/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { GenericResponse, genericResponse } from 'models/generic-response';
import { ZodError } from 'zod';
import authClient from './ky-auth-crient';
// import { ErrorResponse } from 'services/models/error-response';

const GetVerifiyEmail = async (
  verificationCode: string,
  options?: Options,
): Promise<GenericResponse> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };

  const response = await authClient.get(`auth/verifyemail/${verificationCode}`, mergedOptions);
  const json = await response.json();

  try {
    genericResponse.parse(json);
  } catch (e) {
    if (e instanceof ZodError) {
      throw Error('JSON parce error');
    }
  }

  return json as GenericResponse;
};

export default GetVerifiyEmail;
