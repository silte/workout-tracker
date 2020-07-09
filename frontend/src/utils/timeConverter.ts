export const secondsToHms = (totalSeconds: number | undefined = 0) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor((totalSeconds % 3600) % 60);

  return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}'${addLeadingZero(seconds)} h`;
};

export const unixtimeToDate = (unixtime: number) => {
  const date = new Date(unixtime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day}.${month}.${year} – klo ${addLeadingZero(hours)}.${addLeadingZero(minutes)}`;
};

export const formatDateToISO8601 = (date : Date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  
  return `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;
};
const addLeadingZero = (time: number) => (time < 10 ? `0${time}` : time);
