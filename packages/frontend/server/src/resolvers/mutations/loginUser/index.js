const { listEntrys } = require('when-aws/dynamodb/actions/list-entrys');
const  { createEntry } = require('when-aws/dynamodb/actions/create-entry');

module.exports.randomToken = randomToken = (min = 1000, max = 9999) => {
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports.loginUser = async (root, { email }) => {
  const params = {
    TableName: process.env.USER_TABLE,
     ExpressionAttributeValues: {
      ":e": email
     }, 
     FilterExpression: "email = :e", 
  }

  const user = (await listEntrys(params)).Items[0];
  if (!user) return null;

  const newToken = randomToken();
  user.token = newToken;
  // TODO Whatsapp notification with token
  console.log(newToken);

  await createEntry({
    TableName: process.env.USER_TABLE,
    Item: user,
  });

  return user.id;
};

