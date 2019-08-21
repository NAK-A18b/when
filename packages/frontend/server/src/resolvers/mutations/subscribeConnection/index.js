const { createEntry } = require('when-aws/dynamodb/actions/create-entry');

const { transformUser } = require('../../../transformers/user');

module.exports.subscribeConnection = async (root, { connection }, context) => {
  const { currentUser: user } = context;
  const { connections } = user;

  if (connections && !!connections.find(conn => conn.id === connection)) {
    return transformUser(user);
  }
  user.connections = connections ? [ ...connections, connection ] : [ connection ];

  const createParams = {
    TableName: process.env.USER_TABLE,
    Item: user,
  };

  return transformUser((await createEntry(createParams)));
}
