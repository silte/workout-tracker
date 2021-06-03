import React, { MouseEvent, useEffect, useState } from "react";
import Alert from "../../components/alert/alert";
import Button from "../../components/button/button";
import Container from "../../components/container/container";
import Heading from "../../components/heading/heading";
import { getSuuntoApiInfo, updateDataFromSuunto } from "./dataSources.service";
import SuuntoApiTokenModal from "./suuntoApi.tokenModel";
import SEO from "../../components/seo/seo";

const SuuntoApi = (): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([]);
  const [suuntoApiInfo, setSuuntoApiInfo] = useState<ISuuntoApiInfo | null>(
    null
  );
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const fetchApiInfo = async () => {
      const newSuuntoApiInfo = (await getSuuntoApiInfo()).payload;
      setSuuntoApiInfo(newSuuntoApiInfo || null);
      if (newSuuntoApiInfo && newSuuntoApiInfo?.isFetching) {
        setTimeout(setReload, 1000, Date.now());
      }
    };
    fetchApiInfo();
  }, [reload]);

  const runReload = () => setReload(Date.now());

  const handleUpdate = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    ((e.target as unknown) as { disabled: boolean }).disabled = true;
    const response = await updateDataFromSuunto();
    setTimeout(runReload, 1000);
    if (response.status >= 300) {
      setErrors(response.errors || ["Unknow error."]);
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
        <div className="mt-6 flex items-end">
          <Heading headingLevel={2} accent="Current API token" headingSize="m">
            {suuntoApiInfo
              ? `${suuntoApiInfo.apiToken?.substr(0, 5)}********`
              : "NOT FOUND"}
          </Heading>
          <SuuntoApiTokenModal
            setErrors={setErrors}
            currentToken={suuntoApiInfo?.apiToken || ""}
            setReload={setReload}
          />
        </div>
      </Container>
      <Container className="mt-12">
        <Heading headingLevel={2}>Data synchronization status</Heading>
        <div className="mt-6 flex items-end">
          <Heading accent="Status" headingLevel={3} headingSize="m">
            {!suuntoApiInfo?.isFetching ? "Ready" : "Updating data..."}
          </Heading>
          <Button
            onClick={handleUpdate}
            disabled={
              !suuntoApiInfo?.apiToken ||
              suuntoApiInfo.apiToken.length === 0 ||
              suuntoApiInfo.isFetching
            }
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
        <ol className="list-decimal mt-6 ml-8">
          {suuntoApiInfo?.fetchMessage?.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ol>
      </Container>
    </>
  );
};

export default SuuntoApi;
