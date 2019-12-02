import { dynamodb } from '..';
import { GetItemInput } from 'aws-sdk/clients/dynamodb';

export const getEntry = <T>(params: GetItemInput): Promise<T> => {
  return new Promise((resolve, reject) => {
    dynamodb.get(params, (error, result) => {
      if (error) {
        console.error(error);
        return reject(error);
      }
      resolve(result.Item as T);
    });
  });
};
