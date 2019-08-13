const { listEntrys } = require('when-aws/dynamodb/actions/list-entrys');

module.exports.connections = async (root, args) => {
  const response = (await listEntrys({ 
    TableName: process.env.CONNECTION_TABLE,
  })).Items || [];

  return response;
}