export const getSuuntoApiInfo = async (): Promise<
  IApiResponse<ISuuntoApiInfo | undefined>
> =>
  (
    await fetch('/api/data-source/suunto', {
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();

export const setSuuntoApiToken = async (
  apiToken: string
): Promise<IApiResponse<ISuuntoApiInfo>> =>
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
  IApiResponse<ISuuntoApiInfo>
> =>
  (
    await fetch('/api/data-source/suunto/update', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();
