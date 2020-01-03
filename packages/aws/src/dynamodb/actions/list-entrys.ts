import { dynamodb } from "..";

export const listEntrys = <T>(params: any): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    dynamodb.scan(params, (error, result) => {
      if (error) {
        console.error(error);
        return reject(error);
      }
      return resolve(result.Items as T[]);
    });
  });
};
