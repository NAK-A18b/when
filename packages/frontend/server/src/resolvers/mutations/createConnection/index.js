const uuid = require('uuid');
const { createEntry } = require('when-aws/dynamodb/actions/create-entry');

module.exports.createConnection = async (root, { start, end }) => {
  const params = {
    TableName: process.env.CONNECTION_TABLE,
    Item: {
        id: uuid.v1(),
        start,
        end,
      },
  };

  return await createEntry(params);
}