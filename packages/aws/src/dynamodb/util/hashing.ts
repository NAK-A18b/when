export const hashCode = (s: string): number => {
  let h = 0,
    l = s.length,
    i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  return h;
};

export const generateDateHash = (date: Date) =>
  hashCode(
    `${date.getDate()}${date.getMonth()}${date.getFullYear()}`
  ).toString();

export const generateHash = (string: string): string =>
  hashCode(string).toString();
