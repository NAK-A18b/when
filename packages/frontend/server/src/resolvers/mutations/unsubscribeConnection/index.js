const { createEntry } = require('when-aws/dynamodb/actions/create-entry');
const { getEntry } = require('when-aws/dynamodb/actions/get-entry');

const { transformSubscriber } = require('../../../transformers/subscriber');

module.exports.unsubscribeConnection = async (root, { connection, subscriber: id }) => {
  const getParams = {
    TableName: process.env.SUBSCRIBER_TABLE,
    Key: {
      id,
    },
  };
  const subscriber = (await getEntry(getParams)).Item;
  const { connections } = subscriber;
  if (connections && !connections.includes(connection)) return transformSubscriber(subscriber);
  subscriber.connections = connections.filter(conn => conn !== connection);

  console.log(subscriber);
  const createParams = {
    TableName: process.env.SUBSCRIBER_TABLE,
    Item: subscriber,
  };

  return transformSubscriber((await createEntry(createParams)));
}
