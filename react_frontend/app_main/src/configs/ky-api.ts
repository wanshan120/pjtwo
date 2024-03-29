/* eslint-disable import/prefer-default-export */
import { Options as KyOptions, NormalizedOptions } from 'ky';
import camelcaseKeys from 'camelcase-keys';

export const DEFAULT_API_OPTIONS: KyOptions = {
  prefixUrl: 'http://localhost:8080/api/v1',
  timeout: 7000,
  credentials: 'include',
  retry: 0,
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
  },
};
