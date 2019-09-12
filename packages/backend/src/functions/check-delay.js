const { updateEntry } = require('when-aws/dynamodb/actions/update-entry');
const { getEntry } = require('when-aws/dynamodb/actions/get-entry');

const { hvvRequest, requestOptions } = require('../app/hvv/index');
const { lambda } = require('../app/helper');

module.exports.checkDelay = (event, context, callback) => {
  const { connections } = event;
  connections.map(async id => {
    const connectionParams = {
      TableName: process.env.CONNECTION_TABLE,
      Key: {
        id
      }
    };

    const delayParams = {
      TableName: process.env.DELAY_TABLE,
      Key: {
        id
      }
    };

    const connection = (await getEntry(connectionParams)).Item;
    const oldEntry = (await getEntry(delayParams)).Item || [];
    const body = requestOptions(connection, event);

    hvvRequest('getRoute', body)
      .then(async body => {
        if (
          !!body.returnCode &&
          body.returnCode === 'OK' &&
          !!body.realtimeSchedules
        ) {
          body.realtimeSchedules.map(e => {
            e.scheduleElements.map(s => {
              delete s.paths;
            });
          });
          const updateParams = {
            TableName: process.env.DELAY_TABLE,
            Key: {
              id: connection.id
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
          const newEntry = (await getEntry(delayParams)).Item;
          const opts = {
            FunctionName: 'when-notification-app-backend-dev-evaluateDelay',
            InvocationType: 'Event',
            Payload: JSON.stringify({
              connection,
              oldEntry,
              newEntry,
              tel: event.tel
            })
          };
          lambda.invoke(opts).send();
        }
      })
      .catch(e => {
        console.log(e);
      });
  });
};
