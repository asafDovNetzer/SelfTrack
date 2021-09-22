export const setDate = () => {
  const now = new Date(Date.now());
  const day = now.getDate().toString().padStart(2, `0`);
  const month = now.getMonth().toString().padStart(2, `0`);
  const year = now.getFullYear().toString();

  return day + month + year;
};

export const timeStringFromTimestamp = (timestamp: number) => {
  const date: Date = new Date(timestamp);
  const hours: string = date.getHours().toString().padStart(2, `0`);
  const minutes: string = date.getMinutes().toString().padStart(2, `0`);
  const seconds: string = date.getSeconds().toString().padStart(2, `0`);

  return `${hours}:${minutes}:${seconds}`;
};

export const stringPlusDayToTimestamp = (
  hour: number,
  minute: number,
  second: number,
  timestamp: number
) => {
  const stringOfDay: Date = new Date(timestamp);

  // console.log(hour, minute, second);

  const date: Date = new Date(
    stringOfDay.getFullYear(),
    stringOfDay.getMonth(),
    stringOfDay.getDate(),
    hour,
    minute,
    second
  );

  // console.log(date);

  const newTimestamp: number = date.getTime();
  return newTimestamp;
};

export const calcEndOfDay = () => {
  const date: Date = new Date(Date.now());

  const year: number = date.getFullYear();
  const month: number = date.getMonth();
  const day: number = date.getDate() + 1;

  const newDate: Date = new Date(year, month, day);

  return newDate.getTime();
};
