const {listEntrys} = require('when-aws/dynamodb/actions/list-entrys');
const {getEntry} = require('when-aws/dynamodb/actions/get-entry');
const {hvvRequest} = require("../app/hvv/index");

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
        console.log(body.realtimeSchedules);
      }).catch(e => {
        console.log(e)
      });
    }).catch(error => console.log(`Fetching user from DynamoDB failed with ${error}`))
  });
};