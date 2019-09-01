const aws = require('aws-sdk');

const { updateEntry } = require('when-aws/dynamodb/actions/update-entry');
const { getEntry } = require('when-aws/dynamodb/actions/get-entry');

const { hvvRequest, requestOptions } = require('../app/hvv/index');

module.exports.checkDelay = (event, context, callback) => {
  const { connections } = event;
  connections.map(async id => {
    const connectionParams = {
      TableName: process.env.CONNECTION_TABLE,
      Key: {
        id
      }
    };

    const oldEntry = (await getEntry(connectionParams)).Item;
    const body = requestOptions(oldEntry, event);

    hvvRequest('getRoute', body)
      .then(async body => {
        if (
          !!body.returnCode &&
          body.returnCode === 'OK' &&
          !!body.realtimeSchedules
        ) {
          const updateParams = {
            TableName: process.env.CONNECTION_TABLE,
            Key: {
              id: oldEntry.id
            },
            UpdateExpression: 'SET #realtimeSchedules =:val1',
            ExpressionAttributeNames: {
              '#realtimeSchedules': 'realtimeSchedules'
            },
            ExpressionAttributeValues: {
              ':val1': body.realtimeSchedules
            }
          };

          await updateEntry(updateParams);
          const newEntry = (await getEntry(connectionParams)).Item;

          const lambda = new aws.Lambda({
            apiVersion: '2031',
            endpoint: process.env.IS_OFFLINE
              ? 'http://localhost:3000'
              : undefined,
            region: 'us-east-1'
          });

          const opts = {
            FunctionName: 'when-notification-app-dev-evaluateDelay',
            InvocationType: 'Event',
            Payload: JSON.stringify({
              oldEntry,
              newEntry,
              tel: event.tel
            })
          };

          lambda.invoke(opts, (err, data) => {
            if (err) {
              console.log(
                'Error while invoking function evaluateDelay: ' + err
              );
            } else if (data) {
              console.log('evaluateDelay successful invoked');
            }
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  });
};
