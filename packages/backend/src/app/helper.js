const aws = require('aws-sdk');

const { env } = process;
const lambda = new aws.Lambda({
  apiVersion: '2031',
  region: 'eu-central-1',
  endpoint: env.IS_LOCAL || env.IS_OFFLINE ? 'http://localhost:3000' : undefined
});

module.exports.lambda = lambda;
