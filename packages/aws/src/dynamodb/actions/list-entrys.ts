import { dynamodb } from '..';
import { ScanInput } from 'aws-sdk/clients/dynamodb';

export const listEntrys = <T>(params: ScanInput): Promise<T[]> => {
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
