import { dynamodb } from "..";

export const getEntry = <T>(params: any): Promise<T> => {
  return new Promise((resolve, reject) => {
    dynamodb.get(params, (error, result) => {
      if (error) {
        console.error("DynamoDB 'getEntry' Error: ", error);
        return reject(error);
      }

      resolve(result.Item as T);
    });
  });
};
