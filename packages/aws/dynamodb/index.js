const AWS = require('aws-sdk');

let options = {};

// connect to local DB if running offline
//

const { env } = process;
if (env.IS_LOCAL || env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  };
}

//Use new AWS.DynamoDB.DocumentClient() when deploying to AWS!
module.exports.dynamodb = new AWS.DynamoDB.DocumentClient(options);
