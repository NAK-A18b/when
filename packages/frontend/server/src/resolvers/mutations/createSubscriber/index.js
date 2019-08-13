const uuid = require('uuid');

const { createEntry } = require('when-aws/dynamodb/actions/create-entry');

const { transformSubscriber } = require('../../../transformers/subscriber');

module.exports.createSubscriber = async (root, { username, tel, centuria }) => {
  const params = {
    TableName: process.env.SUBSCRIBER_TABLE,
    Item: {
      id: uuid.v1(),
      username,
      tel,
      centuria,
      connections: [],
    },
  };

  return transformSubscriber(await createEntry(params));
}
