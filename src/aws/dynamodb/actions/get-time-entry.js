import { generateIdHash } from '../utils';
import dynamodb from '..';

export default (date) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: generateIdHash(date),
    },
  };

  return new Promise((resolve, reject) => {
    dynamodb.get(params, (error, result) => {
      if (error) {
        console.error(error);
        return reject(error);;
      }
      
      resolve(result);
    }
  )});
};