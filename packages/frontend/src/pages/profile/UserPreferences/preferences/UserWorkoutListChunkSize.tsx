import { UserPreferenceProperty } from '@local/types';
import { useNavigate } from 'react-router-dom';

import { Form } from '../../../../components/form/form';
import { Input } from '../../../../components/input/input';
import { useSetPageInfo } from '../../../../hooks/useSetPageInfo';
import {
  useUserPreferencesControllerFindOneQuery,
  useUserPreferencesControllerUpdateMutation,
} from '../../../../redux/generated/api';

export const UserWorkoutListChunkSize = (): JSX.Element => {
  useSetPageInfo({
    title: 'Max amount of items per page',
    backLink: '/profile/user-preferences',
  });

  const navigate = useNavigate();

  const { data: userPreference } = useUserPreferencesControllerFindOneQuery({
    userPreferenceProperty: UserPreferenceProperty.LIST_CHUNK_SIZE,
  });

  const [setDefaultChunkSize] = useUserPreferencesControllerUpdateMutation();

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      chunkSize: { value },
    } = event.target as unknown as {
      chunkSize: HTMLInputElement;
    };

    await setDefaultChunkSize({
      updateUserPreferenceDto: {
        key: UserPreferenceProperty.LIST_CHUNK_SIZE,
        value: Number(value).toString(),
      },
    });

    navigate('/profile/user-preferences');
  };

  return (
    <Form
      handleSubmit={handleSave}
      submitLabel="Save"
      formFooterBackLink="/profile/user-preferences"
    >
      <div className="grid gap-y-4 gap-x-4 sm:grid-cols-2">
        <Input
          id="chunkSize"
          type="number"
          min={3}
          step={1}
          max={100}
          isRequired
          value={userPreference?.value}
        >
          Items per page, e.g. transactions
        </Input>
      </div>
    </Form>
  );
};
