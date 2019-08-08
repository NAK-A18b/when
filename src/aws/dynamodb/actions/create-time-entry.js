import { generateIdHash } from '../utils';
import dynamodb from '..';

export default (date, centuria, {start, end}) => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: generateIdHash(date),
      start,
      end,
      centuria,
    },
  };

  return new Promise((resolve, reject) => {
    dynamodb.put(params, (error) => {
      if (error) {
        console.error(error);
        return reject(error);
      }
  
      console.info(`Put item into Table: ${params.Item.id}`);
      resolve(params.Item);
    });
  });
};