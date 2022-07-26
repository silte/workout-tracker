import { useEffect, useState } from 'react';

import Alert from '../../components/alert/alert';
import Button from '../../components/button/button';
import Container from '../../components/container/container';
import Heading from '../../components/heading/heading';
import SEO from '../../components/seo/seo';
import { SuuntoApiInfoDto } from '../../redux/generated/api';
import {
  getSuuntoApiInfo,
  updateDataFromSuunto,
} from '../../services/data-sources.service';

import SuuntoApiTokenModal from './suuntoApi.tokenModel';

const SuuntoApi = (): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([]);
  const [suuntoApiInfo, setSuuntoApiInfo] = useState<SuuntoApiInfoDto | null>(
    null
  );
  const [reload, setReload] = useState(0);
  const [isUpdateButtonDisabled, setisUpdateButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchApiInfo = async () => {
      const newSuuntoApiInfo = await getSuuntoApiInfo();
      setSuuntoApiInfo(newSuuntoApiInfo || null);
      if (newSuuntoApiInfo && newSuuntoApiInfo?.isFetching) {
        setTimeout(setReload, 2000, Date.now());
      }
    };
    fetchApiInfo();
  }, [reload]);

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
    if (response.status >= 300) {
      setErrors(response.errors || ['Unknow error.']);
      return;
    }
    setErrors([]);
  };

  return (
    <>
      <SEO title="Manage Suunto integration" />
      <Container className="my-12">
        {errors.length > 0 && (
          <Alert additionalInformation={errors}>
            There were {errors.length} errors with your submission
          </Alert>
        )}
        <Heading headingLevel={1}>Manage your suunto API integration</Heading>
        <div className="flex items-end mt-6">
          <Heading headingLevel={2} accent="Current API token" headingSize="m">
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
        <Heading headingLevel={2}>Data synchronization status</Heading>
        <div className="flex items-end mt-6">
          <Heading accent="Status" headingLevel={3} headingSize="m">
            {!suuntoApiInfo?.isFetching ? 'Ready' : 'Updating data...'}
          </Heading>
          <Button
            onClick={handleUpdate}
            disabled={isUpdateButtonDisabled}
            className="ml-12"
          >
            Sync data from API
          </Button>
        </div>
      </Container>
      <Container className="mt-12">
        <Heading headingLevel={3} headingSize="m">
          Synchronization status messages
        </Heading>
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
