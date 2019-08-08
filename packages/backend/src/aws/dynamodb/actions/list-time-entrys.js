import dynamodb from '..';

export default () => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  return new Promise((resolve, reject) => {
    dynamodb.scan(params, (error, result) => {
      if (error) {
        console.error(error);
        return reject(error);
      }
  
      return resolve(result);
    });
  });
};