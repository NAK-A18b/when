const uuid = require('uuid');

const { deleteEntry } = require('when-aws/dynamodb/actions/delete-entry');

const { transformSubscriber } = require('../../../transformers/subscriber');

module.exports.deleteSubscriber = async (root, { id }) => {
  const params = {
    TableName: process.env.SUBSCRIBER_TABLE,
    Key: {
      id,
    },
  };

  await deleteEntry(params);
  return true;
}
