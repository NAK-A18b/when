import { dynamodb } from "..";

export const deleteEntry = (params: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    dynamodb.delete(params, error => {
      if (error) {
        console.error(error);
        return reject(error);
      }
      resolve();
    });
  });
};
