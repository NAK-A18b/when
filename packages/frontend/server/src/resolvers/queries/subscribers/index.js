const { listEntrys } = require('when-aws/dynamodb/actions/list-entrys');

const { transformSubscriber } = require('../../../transformers/subscriber');

module.exports.subscribers = async (root, args) => {
  const response = (await listEntrys({ 
    TableName: process.env.SUBSCRIBER_TABLE, 
  })).Items || [];

  return response.map(transformSubscriber);
}