export const randomToken = (min = 1000, max = 9999) =>
  Math.floor(Math.random() * (max - min) + min);
