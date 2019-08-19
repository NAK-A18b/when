const { listEntrys } = require('when-aws/dynamodb/actions/list-entrys');
const  { createEntry } = require('when-aws/dynamodb/actions/create-entry');

const { transformUser } = require('../../../transformers/user')

module.exports.randomToken = randomToken = (min = 1000, max = 9999) => {
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports.loginUser = async (root, { tel, token }) => {
  const params = {
    TableName: process.env.USER_TABLE,
     ExpressionAttributeValues: {
      ":t": tel
     }, 
     FilterExpression: "tel = :t",
  }

  const response = await listEntrys(params);
  const user = await transformUser(response.Items[0]);
  if (!user) return null

  return user.token === token ? user : null
};
