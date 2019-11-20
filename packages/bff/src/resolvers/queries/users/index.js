const { listEntrys } = require('when-aws/dynamodb/actions/list-entrys');

const { transformUser } = require('../../../transformers/user');

module.exports.users = async (root, args) => {
  const params = {
    TableName: process.env.USER_TABLE,
  };

  const response = (await listEntrys(params)).Items || [];

  return response.map(transformUser);
}