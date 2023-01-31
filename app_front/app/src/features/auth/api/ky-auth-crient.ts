/* eslint-disable import/prefer-default-export */
import ky, { NormalizedOptions } from 'ky';
import camelcaseKeys from 'camelcase-keys';
import { DEFAULT_API_OPTIONS } from 'configs/ky-api';
import { ILoginResponse, iLoginResponse } from 'models/i-login-response';
import { ZodError } from 'zod';

const authClient = ky.create({
  prefixUrl: 'http://localhost:8080/api/v1',
  timeout: 7000,
  retry: 2,
  hooks: {
    afterResponse: [
      async (
        _request: Request,
        _options: NormalizedOptions,
        response: Response,
      ): Promise<Response> => {
        const body = new Blob([JSON.stringify(camelcaseKeys(await response.json()), null, 2)], {
          type: 'application/json',
        });
        const { headers, status, statusText } = response;
        const init = { headers, status, statusText };

        return new Response(body, init);
      },
    ],
    beforeRetry: [
      async ({ request, error, retryCount }) => {
        console.log(`retry: ${retryCount}`);
        if (error.message.includes('not logged in') && retryCount !== 0) {
          const res = await ky.get(`auth/reflesh`, { credentials: 'include' });
          console.log('refreshed');
          try {
            const json = await res.json();
            const ires: ILoginResponse = iLoginResponse.parse(json);
            request.headers.set('refresh_token', `${ires.accessToken}`);
          } catch (e) {
            if (e instanceof ZodError) {
              throw Error('JSON parce error');
            }
          }
        }
      },
    ],
  },
});

export default authClient;
