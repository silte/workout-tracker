import { useEffect, useState } from 'react';

import { Alert } from '../../../components/alert/alert';
import { Button } from '../../../components/button/button';
import { Container } from '../../../components/container/container';
import { Heading } from '../../../components/heading/heading';
import { useSetPageInfo } from '../../../hooks/useSetPageInfo';
import {
  api,
  useSuuntoApiInfoControllerUpdateSummaryListMutation,
} from '../../../redux/generated/api';

import SuuntoApiTokenModal from './suuntoApi.tokenModel';

const { useLazySuuntoApiInfoControllerFindByUserQuery } = api;

const SuuntoApi = (): JSX.Element => {
  useSetPageInfo({ title: 'Manage Suunto integration' });

  const [errors, setErrors] = useState<string[]>([]);
  const [fetchSuuntoApi, { data: suuntoApiInfo }] =
    useLazySuuntoApiInfoControllerFindByUserQuery();
  const [updateDataFromSuunto] =
    useSuuntoApiInfoControllerUpdateSummaryListMutation();
  const [reload, setReload] = useState(0);
  const [isUpdateButtonDisabled, setisUpdateButtonDisabled] = useState(true);

  useEffect(() => {
    fetchSuuntoApi(undefined, false);

    if (suuntoApiInfo?.isFetching) {
      setTimeout(setReload, 2000, Date.now());
    }
  }, [fetchSuuntoApi, reload, suuntoApiInfo?.isFetching]);

  useEffect(() => {
    setisUpdateButtonDisabled(
      Boolean(!suuntoApiInfo?.apiToken.length || suuntoApiInfo?.isFetching)
    );
  }, [suuntoApiInfo]);

  const runReload = () => setReload(Date.now());

  const handleUpdate = async (): Promise<void> => {
    setisUpdateButtonDisabled(true);
    const response = await updateDataFromSuunto();
    runReload();
    if ('error' in response) {
      setErrors((response.error as string[]) || ['Unknow error.']);
      return;
    }
    setErrors([]);
  };

  return (
    <>
      <Container className="my-12">
        {errors.length > 0 && (
          <Alert additionalInformation={errors}>
            There were {errors.length} errors with your submission
          </Alert>
        )}
        <div className="flex items-end mt-6">
          <Heading variant="h2">
            Current API token:{' '}
            {suuntoApiInfo
              ? `${suuntoApiInfo.apiToken?.substr(0, 5)}********`
              : 'NOT FOUND'}
          </Heading>
          <SuuntoApiTokenModal
            setErrors={setErrors}
            currentToken={suuntoApiInfo?.apiToken || ''}
            setReload={setReload}
          />
        </div>
      </Container>
      <Container className="mt-12">
        <Heading variant="h2">Data synchronization status</Heading>
        <div className="flex items-end mt-6">
          <Heading variant="h3">
            Status: {!suuntoApiInfo?.isFetching ? 'Ready' : 'Updating data...'}
          </Heading>
          <Button
            onClick={handleUpdate}
            isDisabled={isUpdateButtonDisabled}
            className="ml-12"
          >
            Sync data from API
          </Button>
        </div>
      </Container>
      <Container className="mt-12">
        <Heading variant="h3">Synchronization status messages</Heading>
        <ol className="mt-6 ml-8 list-decimal">
          {suuntoApiInfo?.fetchMessage?.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ol>
      </Container>
    </>
  );
};

export default SuuntoApi;
