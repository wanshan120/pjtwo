/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { ILoginResponse, iLoginResponse } from 'models/i-login-response';
import { ZodError } from 'zod';
import ky, { HTTPError } from 'ky';
// import { ErrorResponse } from 'services/models/error-response';

const getRefreshAccessToken = async () => {
  try {
    const response = await ky.get(`auth/refresh`, DEFAULT_API_OPTIONS);
    const json = await response.json();

    iLoginResponse.parse(json);

    return json as ILoginResponse;
  } catch (error) {
    if (error instanceof ZodError) {
      throw Error(error.message);
    }
    if (error instanceof HTTPError) {
      const serverMessage = await error.response.text();
      throw Error(serverMessage);
    } else {
      throw error;
    }
  }
};

export default getRefreshAccessToken;
