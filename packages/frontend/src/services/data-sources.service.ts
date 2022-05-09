import { SuuntoApiInfoDto, UpdateSuuntoApiInfoDto } from '@local/types';

export const getSuuntoApiInfo = async (): Promise<SuuntoApiInfoDto> =>
  (
    await fetch('/api/suunto-api-info', {
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();

export const updateSuuntoApiInfo = async (
  suuntoApiInfo: UpdateSuuntoApiInfoDto
): Promise<IApiResponse<SuuntoApiInfoDto>> =>
  (
    await fetch('/api/suunto-api-info', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(suuntoApiInfo),
    })
  ).json();

export const updateDataFromSuunto = async (): Promise<IApiResponse<void>> =>
  (
    await fetch('/api/suunto-api-info/sync-data', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();
