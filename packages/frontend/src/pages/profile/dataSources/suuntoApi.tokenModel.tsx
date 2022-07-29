/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';

import { Input } from '../../../components/input/input';
import { ModalConfirm } from '../../../components/modal/confirm/modal.confirm';
import { useSuuntoApiInfoControllerUpdateMutation } from '../../../redux/generated/api';

interface ISuuntoApiTokenModalProps {
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  setReload: React.Dispatch<React.SetStateAction<number>>;
  currentToken?: string;
}

const apiTokenHelpText =
  'To find your token: Open https://www.sports-tracker.com/dashboard and login. After that run following command in developer console (F12) to get your API token. `prompt("your api token", document.cookie.replaceAll(" ", "").split(";").find(i => typeof i !== "undefined" && i.substr(0,11) == \'sessionkey=\' ).substr(11))`';

const SuuntoApiTokenModal = ({
  setErrors,
  setReload,
  currentToken,
}: ISuuntoApiTokenModalProps): JSX.Element => {
  const [updateSuuntoApiInfo] = useSuuntoApiInfoControllerUpdateMutation();

  const apiTokenInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (): Promise<boolean> => {
    const response = await updateSuuntoApiInfo({
      updateSuuntoApiInfoDto: {
        apiToken: apiTokenInputRef.current?.value || '',
      },
    });

    if ('error' in response) {
      setErrors((response.error as string[]) || ['Unknow error.']);
      return false;
    }
    setErrors([]);
    setReload(Date.now());
    return true;
  };

  return (
    <div className="ml-12">
      <ModalConfirm
        label="Edit your API token"
        modalOpenButtonLabel="Edit"
        submitButtonLabel="Save"
        onConfirm={handleSubmit}
      >
        <Input
          id="apiToken"
          help={apiTokenHelpText}
          isRequired
          ref={apiTokenInputRef as any}
          value={currentToken}
        >
          Access token to suunto api
        </Input>
      </ModalConfirm>
    </div>
  );
};

export default SuuntoApiTokenModal;
