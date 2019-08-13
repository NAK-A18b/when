const uuid = require('uuid');

const { createEntry } = require('when-aws/dynamodb/actions/create-entry');

const { transformUser } = require('../../../transformers/user');

module.exports.createUser = async (root, { username, tel, centuria }) => {
  const params = {
    TableName: process.env.USER_TABLE,
    Item: {
      id: uuid.v1(),
      username,
      tel,
      centuria,
      connections: [],
    },
  };

  return transformUser(await createEntry(params));
}
