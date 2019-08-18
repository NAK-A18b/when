const { createEntry } = require('when-aws/dynamodb/actions/create-entry');
const { getEntry } = require('when-aws/dynamodb/actions/get-entry');

const { transformUser } = require('../../../transformers/user');

module.exports.unsubscribeConnection = async (root, { connection, user: id }) => {
  const getParams = {
    TableName: process.env.USER_TABLE,
    Key: {
      id,
    },
  };
  const user = (await getEntry(getParams)).Item;
  const { connections } = user;
  if (connections && !connections.includes(connection)) return transformUser(user);
  user.connections = connections.filter(conn => conn !== connection);

  const createParams = {
    TableName: process.env.USER_TABLE,
    Item: user,
  };

  return transformUser((await createEntry(createParams)));
}
