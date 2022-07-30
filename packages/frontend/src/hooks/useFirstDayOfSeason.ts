import { UserPreferenceProperty } from '@local/types';
import { useMemo } from 'react';

import { useUserPreferencesControllerFindOneQuery } from '../redux/generated/api';

export const useFirstDayOfSeason = () => {
  const { data: userPreference, isLoading } =
    useUserPreferencesControllerFindOneQuery({
      userPreferenceProperty: UserPreferenceProperty.FIRST_MONTH_OF_SEASON,
    });

  const firstMonthOfSeason = parseInt(userPreference?.value || '1');

  return useMemo(() => {
    if (isLoading) return null;

    const targetDate = new Date();
    const currentMonth = targetDate.getMonth() + 1;

    if (currentMonth < firstMonthOfSeason) {
      targetDate.setFullYear(targetDate.getFullYear() - 1);
    }

    targetDate.setDate(1);
    targetDate.setMonth(firstMonthOfSeason);

    return targetDate;
  }, [firstMonthOfSeason, isLoading]);
};
