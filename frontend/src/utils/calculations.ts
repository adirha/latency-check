const padTo2Digits = (num: number) => num.toString().padStart(2, "0");

export const convertMsToTime = (milliseconds: number = 0) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
};

export const timeToMs = (h: number, m: number, s: number) =>
  (h * 60 * 60 + m * 60 + s) * 1000;
