import { dynamodb } from "..";

export const updateEntry = (params: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    dynamodb.update(params, error => {
      if (error) {
        console.error(error);
        return reject(error);
      }
      return resolve();
    });
  });
};
