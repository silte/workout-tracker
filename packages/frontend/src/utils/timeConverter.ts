const addLeadingZero = (time: number) => (time < 10 ? `0${time}` : time);

export const secondsToHms = (totalSeconds: number | undefined = 0): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor((totalSeconds % 3600) % 60);

  return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}'${addLeadingZero(
    seconds
  )} h`;
};

export const unixtimeToDate = (unixtime: number): string => {
  const date = new Date(unixtime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day}.${month}.${year} – klo ${addLeadingZero(
    hours
  )}.${addLeadingZero(minutes)}`;
};

export const formatDateToISO8601 = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  return `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;
};

export const getFirstDayOfWeek = (date: Date): Date => {
  const dayDiffToMonday = date.getDay() > 0 ? date.getDay() - 1 : 6;
  const mondayDate = new Date(date);

  mondayDate.setDate(mondayDate.getDate() - dayDiffToMonday);
  return mondayDate;
};

export const getLastDayOfWeek = (date: Date): Date => {
  const sundayDate = getFirstDayOfWeek(date);
  sundayDate.setDate(sundayDate.getDate() + 7);
  return sundayDate;
};

export const getFirstDayOfNextWeek = (date: Date): Date => {
  const nextWeekMonday = getFirstDayOfWeek(date);
  nextWeekMonday.setDate(nextWeekMonday.getDate() + 7);
  return nextWeekMonday;
};

export const getFirstDayOfPreviousWeek = (date: Date): Date => {
  const previousWeekMonday = getFirstDayOfWeek(date);
  previousWeekMonday.setDate(previousWeekMonday.getDate() - 7);
  return previousWeekMonday;
};

export const getFirstDayOfMonth = (date: Date): Date => {
  const firstDayOfMonth = new Date(date);
  firstDayOfMonth.setDate(1);
  return firstDayOfMonth;
};

export const getLastDayOfMonth = (date: Date): Date => {
  const lastDayIfMonth = new Date(date);
  lastDayIfMonth.setMonth(lastDayIfMonth.getMonth() + 1);
  lastDayIfMonth.setDate(0);
  return lastDayIfMonth;
};

export const getFirstDayOfNextMonth = (date: Date): Date => {
  const firstDayOfNextMonth = getFirstDayOfMonth(date);
  firstDayOfNextMonth.setMonth(firstDayOfNextMonth.getMonth() + 1);
  return firstDayOfNextMonth;
};

export const getFirstDayOfPreviousMonth = (date: Date): Date => {
  const firstDayOfNextMonth = getFirstDayOfMonth(date);
  firstDayOfNextMonth.setMonth(firstDayOfNextMonth.getMonth() - 1);
  return firstDayOfNextMonth;
};
