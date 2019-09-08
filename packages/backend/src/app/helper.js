const aws = require('aws-sdk');

/*
For offline usage add
  endpoint: process.env.IS_OFFLINE
    ? 'http://localhost:3000'
    : undefined,
 */
export const lambda = new aws.Lambda({
  apiVersion: '2031',
  region: 'eu-central-1'
});