/* eslint-disable import/prefer-default-export */
import ky, { NormalizedOptions } from 'ky';
import camelcaseKeys from 'camelcase-keys';
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
// import { ILoginResponse, iLoginResponse } from 'models/i-login-response';
// import { ZodError } from 'zod';
import { genericResponse } from 'models/generic-response';
import getRefreshAccessToken from 'features/auth/api/get-refresh-access-token';

const authClient = ky.create({
  prefixUrl: 'http://localhost:8080/api/v1',
  timeout: 7000,
  retry: { limit: 1, methods: ['post', 'get', 'put', 'delete'], statusCodes: [401, 500, 502] },
  credentials: 'include',
  hooks: {
    // beforeRetry: [
    //   async ({ request, error, retryCount }) => {
    //     console.log(`retry: ${retryCount}`);
    //     const e = genericResponse.parse(JSON.parse(error.message));
    //     console.log(`error: ${e.message}`);
    //     // if (error.message.includes('not logged in') && retryCount === 1) {
    //     if (retryCount === 1) {
    //       try {
    //         const response = await ky.get(`http://localhost:8080/api/v1/auth/refresh`, {
    //           credentials: 'include',
    //           retry: 0,
    //         });
    //         const json = await response.json();
    //         const ires: ILoginResponse = iLoginResponse.parse(json);
    //         console.log(`res: ${ires.accessToken}`);
    //         request.headers.set('refresh_token', `${ires.accessToken}`);
    //       } catch (err) {
    //         if (err instanceof ZodError) {
    //           throw Error('JSON parce error');
    //         }
    //       }
    //     }
    //   },
    // ],

    afterResponse: [
      async (
        _request: Request,
        _options: NormalizedOptions,
        response: Response,
      ): Promise<Response> => {
        const responseJson = (await response.json()) as Response;
        const blob = new Blob([JSON.stringify(camelcaseKeys(responseJson), null, 2)], {
          type: 'application/json',
        });
        const { headers, status, statusText } = response;
        const init = { headers, status, statusText };

        return new Response(blob, init);
      },
      // eslint-disable-next-line consistent-return
      async (input, options, response) => {
        // リフレッシュトークンが有効であればアクセストークンを生成
        if (response.status === 401) {
          const responseJson = (await response.json()) as Response;
          const e = genericResponse.parse(responseJson);
          if (e.message?.includes('not logged in')) {
            console.log('did refresh');
            await getRefreshAccessToken();
          }
        }
      },
    ],
  },
});

export default authClient;
