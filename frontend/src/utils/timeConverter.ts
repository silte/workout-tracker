export const secondsToHms = (totalSeconds: number) => {
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

const addLeadingZero = (time: number) => (time < 10 ? `0${time}` : time);
