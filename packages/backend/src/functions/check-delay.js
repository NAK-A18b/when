const aws = require("aws-sdk");

const {updateEntry} = require('when-aws/dynamodb/actions/update-entry');
const {getEntry} = require('when-aws/dynamodb/actions/get-entry');

const {hvvRequest} = require("../app/hvv/index");

module.exports.checkDelay = (event, context, callback) => {
    const connections = event.connections;
    connections.map(connection => {
        const connectionsParams = {
            TableName: process.env.CONNECTION_TABLE,
            Key: {
                id: connection
            }
        };
        getEntry(connectionsParams).then(result => {
            let body = {
                "version": 36,
                "language": "de",
                "start": result.Item.start,
                "dest": result.Item.end,
                "time": {
                    "date": "heute",
                    "time": event.time.hour + ':' + event.time.minute
                },
                "timeIsDeparture": true,
                "schedulesBefore": 0,
                "schedulesAfter": 0,
                "realtime": "REALTIME",
            };
            hvvRequest("getRoute", body).then(async body => {
                if (!!body.returnCode && body.returnCode === 'OK' && !!body.realtimeSchedules) {
                    const connectionParams = {
                        TableName: process.env.CONNECTION_TABLE,
                        Key: {
                            id: connection
                        },
                        UpdateExpression: 'SET #realtimeSchedules =:val1',
                        ExpressionAttributeNames: {
                            '#realtimeSchedules': 'realtimeSchedules'
                        },
                        ExpressionAttributeValues: {
                            ':val1': body.realtimeSchedules
                        }
                    };
                    const oldEntry = await getEntry(connectionsParams);
                    await updateEntry(connectionParams);
                    const newEntry = await getEntry(connectionsParams);
                    const lambda = new aws.Lambda({
                        apiVersion: '2031',
                        endpoint: process.env.IS_OFFLINE ? 'http://localhost:3000' : undefined,
                        region: 'us-east-1',
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
                            console.log('Error while invoking function evaluateDelay: ' + err);
                        } else if (data) {
                            console.log('evaluateDelay successful invoked');
                        }
                    });
                }
            }).catch(e => {
                console.log(e)
            });
        }).catch(error => console.log(`Fetching user from DynamoDB failed with ${error}`))
    });
};