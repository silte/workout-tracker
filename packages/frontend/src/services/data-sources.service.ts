import { SuuntoApiInfoDto } from '@local/types';

export const getSuuntoApiInfo = async (): Promise<SuuntoApiInfoDto> =>
  (
    await fetch('/api/suunto-api-info', {
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();

export const setSuuntoApiToken = async (
  apiToken: string
): Promise<IApiResponse<SuuntoApiInfoDto>> =>
  (
    await fetch('/api/data-source/suunto/set-token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiToken }),
    })
  ).json();

export const updateDataFromSuunto = async (): Promise<
  IApiResponse<SuuntoApiInfoDto>
> =>
  (
    await fetch('/api/data-source/suunto/update', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();
