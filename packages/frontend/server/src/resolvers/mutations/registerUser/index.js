const uuid = require('uuid');

const { randomToken } = require('../loginUser');

const { createEntry } = require('when-aws/dynamodb/actions/create-entry');

const { transformUser } = require('../../../transformers/user');

module.exports.registerUser = async (root, args) => {
  const { email, username, tel, centuria } = args;
  
  const userToken = randomToken();
  const params = {
    TableName: process.env.USER_TABLE,
    Item: {
      id: uuid.v1(),
      email,
      username,
      tel,
      centuria,
      token: userToken
    },
  };
  // TODO Whatsapp notification with token
  console.log(userToken);

  return (await transformUser(await createEntry(params))).id;
};
