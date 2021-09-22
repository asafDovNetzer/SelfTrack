// import * as types from "./CreateTrackers";

export const reletiveTimestampToString = (timestamp: number) => {
  if (timestamp < 0) return `--:--:--`;

  const outputInSeconds: number = Math.round(timestamp / 1000);

  const seconds = (outputInSeconds! % 60).toString().padStart(2, `0`);
  const minutes = Math.floor((outputInSeconds! / 60) % 60)
    .toString()
    .padStart(2, `0`);
  const hours = Math.floor(outputInSeconds! / 3600)
    .toString()
    .padStart(2, `0`);

  const outputString = `${hours}:${minutes}:${seconds}`;

  return outputString;
};

export const absoluteTimestampToString = (timestamp: number) => {
  const date = new Date(timestamp);

  const seconds = date.getSeconds().toString().padStart(2, `0`);
  const minutes = date.getMinutes().toString().padStart(2, `0`);
  const hours = date.getHours().toString().padStart(2, `0`);

  const outputString = `${hours}:${minutes}:${seconds}`;

  return outputString;
};
