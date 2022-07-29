import { UserPreferenceProperty } from '@local/types';
import { useNavigate } from 'react-router-dom';

import { Form } from '../../../../components/form/form';
import { Select } from '../../../../components/select/select';
import { monthNames } from '../../../../constants/months';
import { useSetPageInfo } from '../../../../hooks/useSetPageInfo';
import {
  useUserPreferencesControllerFindOneQuery,
  useUserPreferencesControllerUpdateMutation,
} from '../../../../redux/generated/api';

const monthOption = monthNames.map((month, index) => ({
  label: month,
  value: (index + 1).toString(),
}));

export const UserSeasonSettings = (): JSX.Element => {
  useSetPageInfo({
    title: 'Season settings',
    backLink: '/profile/user-preferences',
  });

  const navigate = useNavigate();

  const { data: userPreference } = useUserPreferencesControllerFindOneQuery({
    userPreferenceProperty: UserPreferenceProperty.FIRST_MONTH_OF_SEASON,
  });

  const [setDefaultChunkSize] = useUserPreferencesControllerUpdateMutation();

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      firstMonthOfSeason: { value },
    } = event.target as unknown as {
      firstMonthOfSeason: HTMLSelectElement;
    };

    await setDefaultChunkSize({
      updateUserPreferenceDto: {
        key: UserPreferenceProperty.FIRST_MONTH_OF_SEASON,
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
        <Select
          id="firstMonthOfSeason"
          options={monthOption}
          defaultValue={userPreference?.value}
        >
          First month of season used for summary calculations
        </Select>
      </div>
    </Form>
  );
};
