const { listEntrys } = require('when-aws/dynamodb/actions/list-entrys');

module.exports.centurias = async (root, args) => {
  const response = (await listEntrys({ 
    TableName: process.env.CENTURIA_TABLE,
  })).Items;

  return response;
}