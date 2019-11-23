const uuid = require('uuid');

const { getEntry } = require('when-aws/dynamodb/actions/get-entry');
const  { createEntry } = require('when-aws/dynamodb/actions/create-entry');
const { listEntrys } = require('when-aws/dynamodb/actions/list-entrys');

module.exports.createUser = async (args) => {
  const token = randomToken();
  const params = {
    TableName: process.env.USER_TABLE,
    Item: {
      id: uuid.v1(),
      token,
      ...args
    },
  };

  return await createEntry(params);
}

module.exports.updateUser = async (user) => {
  return await createEntry({
    TableName: process.env.USER_TABLE,
    Item: user,
  });
}

module.exports.getUser = async (id) => {
  if (!id) return null;
  const params = {
    TableName: process.env.USER_TABLE,
    Key: {
      id,
    }
  }

  const user = (await getEntry(params)).Item;
  return user;
}

module.exports.findUserByTel = async (tel) => {
  const params = {
    TableName: process.env.USER_TABLE,
     ExpressionAttributeValues: {
      ":t": tel
     }, 
     FilterExpression: "tel = :t",
  }

  const response = await listEntrys(params);
  return response.Items[0];
}