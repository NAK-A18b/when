import { dynamodb } from "..";

export const createEntry = (params: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    dynamodb.put(params, error => {
      if (error) {
        console.error(error);
        return reject(error);
      }
      console.info(`Put item into table: ${params.TableName}`);
      resolve();
    });
  });
};
