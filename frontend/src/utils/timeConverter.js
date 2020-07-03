export const unixtimeToString = (unixtime) => {
  const date = new Date(unixtime);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${year}-${month}-${day} ${hours}.${minutes}`;
};
