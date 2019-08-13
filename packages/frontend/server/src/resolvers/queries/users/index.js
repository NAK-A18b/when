const { listEntrys } = require('when-aws/dynamodb/actions/list-entrys');

const { transformUser } = require('../../../transformers/user');

module.exports.users = async (root, args) => {
  const response = (await listEntrys({ 
    TableName: process.env.USER_TABLE, 
  })).Items || [];

  return response.map(transformUser);
}