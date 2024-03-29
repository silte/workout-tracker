import { monthNamesAbbreviation } from '../constants/months';

import { addLeadingZero } from './addLeadingZero';

const formatter = new Intl.DateTimeFormat('fi-FI');

export const getShortYear = (date: Date) =>
  date.getFullYear().toString().slice(-2);

export const getShortMonthAbbreviation = (date: Date) =>
  monthNamesAbbreviation[date.getMonth()];

export const formatDate = (date: Date): string => formatter.format(date);

export const formatDateShort = (date: Date): string =>
  `${getShortMonthAbbreviation(date)} '${getShortYear(date)}`;

export const inputDateFormat = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;
};
