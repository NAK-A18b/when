const uuid = require('uuid');

const { listEntrys } = require('when-aws/dynamodb/actions/list-entrys');
const  { createEntry } = require('when-aws/dynamodb/actions/create-entry');

module.exports.randomToken = randomToken = (min = 1000, max = 9999) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const createUser = async (tel) => {
  const token = randomToken();
  // TODO Whatsapp notification with token
  console.log(token);
  const params = {
    TableName: process.env.USER_TABLE,
    Item: {
      id: uuid.v1(),
      tel,
      token,
    },
  };

  return await createEntry(params);
}

module.exports.triggerAuth = async (root, { tel }) => {
  const params = {
    TableName: process.env.USER_TABLE,
     ExpressionAttributeValues: {
      ":t": tel
     }, 
     FilterExpression: "tel = :t",
  }

  const response = await listEntrys(params);
  const user = response.Items[0];
  
  if (!user) {
    await createUser(tel);
    return true;
  } else {
    const newToken = randomToken();
    user.token = newToken;
    // TODO Whatsapp notification with token
    console.log('Generated new Token: ', newToken);
  
    await createEntry({
      TableName: process.env.USER_TABLE,
      Item: user,
    });
  
    return true;
  }  
};

