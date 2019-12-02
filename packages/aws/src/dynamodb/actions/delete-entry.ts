import { dynamodb } from '..';
import { DeleteItemInput } from 'aws-sdk/clients/dynamodb';

export const deleteEntry = (params: DeleteItemInput): Promise<void> => {
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
