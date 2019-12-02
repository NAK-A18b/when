import { dynamodb } from '..';
import { UpdateItemInput } from 'aws-sdk/clients/dynamodb';

export const updateEntry = (params: UpdateItemInput): Promise<void> => {
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
