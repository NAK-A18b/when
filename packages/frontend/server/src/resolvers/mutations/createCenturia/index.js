const { generateHash } = require('when-aws/dynamodb/utils');
const { createEntry } = require('when-aws/dynamodb/actions/create-entry');

module.exports.createCenturia = async (root, { name, semester }) => {
  const params = {
    TableName: process.env.CENTURIA_TABLE,
    Item: {
      id: generateHash(name),
      name,
      semester,
    },
  };

  return await createEntry(params);
}