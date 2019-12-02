import { dynamodb } from '..';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';

export const createEntry = (params: PutItemInput): Promise<void> => {
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
