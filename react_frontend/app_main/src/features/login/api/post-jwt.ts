import ky, { Options } from 'ky';
import { ZodError } from 'zod';
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { Jwt, jwt } from 'models/jwt';
// import { ErrorResponse } from 'services/models/error-response';

const postJwt = async (options?: Options): Promise<Jwt> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };
  const response = await ky.post('token', mergedOptions);
  const json = await response.json();

  try {
    jwt.parse(json);
  } catch (e) {
    if (e instanceof ZodError) {
      // const errorResponse: ErrorResponse = {
      //   message: '不正なクエリパラメータです。',
      // };
      // res.status(400).json(errorResponse);
      console.log('レスポンス');
      console.log(response.status);
      console.log(response.statusText);
      console.log(e);
      // throw Error('API type error');
    }
  }
  // if (!movieSchema(movie)) {
  //   throw Error('API type error');
  // }

  console.log(json);

  return json as Jwt;
};

export default postJwt;
