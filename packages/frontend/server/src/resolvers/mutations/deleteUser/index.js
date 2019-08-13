const { deleteEntry } = require('when-aws/dynamodb/actions/delete-entry');

module.exports.deleteUser = async (root, { id }) => {
  const params = {
    TableName: process.env.USER_TABLE,
    Key: {
      id,
    },
  };

  await deleteEntry(params);
  return true;
}
