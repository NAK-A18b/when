const {updateEntry} = require('when-aws/dynamodb/actions/update-entry');
const {getEntry} = require('when-aws/dynamodb/actions/get-entry');
const {hvvRequest} = require("../app/hvv/index");
const {sendMessage} = require("when-whatsapp/functions/send-message");

module.exports.checkDelay = (event, context, callback) => {
    callback(null, {});
    const connections = event.connections;
    connections.map(connection => {
        const connectionsParamas = {
            TableName: process.env.CONNECTION_TABLE,
            Key: {
                id: connection
            }
        };
        getEntry(connectionsParamas).then(result => {
            let body = {
                "version": 36,
                "language": "de",
                "start": result.Item.start,
                "dest": result.Item.end,
                "time": {
                    "date": "heute",
                    "time": "jetzt"
                },
                "timeIsDeparture": true,
                "schedulesBefore": 0,
                "schedulesAfter": 0,
                "realtime": "REALTIME",
            };
            hvvRequest("getRoute", body).then(body => {
                if (body.hasOwnProperty('returnCode') && body.returnCode === 'OK' && body.hasOwnProperty('realtimeSchedules')) {
                    body.realtimeSchedules.map(e => {
                        e.scheduleElements.map(s => {
                            delete s.paths;
                            if (s.from.hasOwnProperty('depDelay') && s.line.name !== 'Umstiegsfußweg' && s.from.depDelay > 59 && s.to.arrDelay > 59) {
                                sendMessage(event.tel, `${s.line.name} von ${s.from.name} nach ${s.to.name}, ursprünglich um ${s.from.depTime.time}, hat eine Verspätung von ${(s.from.depDelay)/60} Minuten`);
                            }
                        });
                    });

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
                    updateEntry(connectionParams);

                }
            }).catch(e => {
                console.log(e)
            });
        }).catch(error => console.log(`Fetching user from DynamoDB failed with ${error}`))
    });
};