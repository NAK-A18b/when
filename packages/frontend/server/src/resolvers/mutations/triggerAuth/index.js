const uuid = require('uuid');
const request = require('request');
const {parsePhoneNumberFromString} = require('libphonenumber-js/max');
const {UserInputError} = require("apollo-server-errors");

const {listEntrys} = require('when-aws/dynamodb/actions/list-entrys');
const {createEntry} = require('when-aws/dynamodb/actions/create-entry');

module.exports.randomToken = randomToken = (min = 1000, max = 9999) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createUser = async (tel) => {
  const phoneNumber = parsePhoneNumberFromString(tel, 'DE');
  if (phoneNumber !== undefined && phoneNumber.isValid() && phoneNumber.getType() === 'MOBILE') {
    tel = phoneNumber.number.substr(1);
    const token = randomToken();

    request.post('http://35.196.195.229/sendMessage', {
      json: [{"receiver": tel, "text": `👋 Dein Anmeldecode lautet *${token}* und ist eine Minute lang gültig`}]
    }, (error, res, body) => {
      if (error) {
        console.error(error);
        return
      }
      console.log(`statusCode: ${res.statusCode}`);
      console.log(body)
    }).auth('nordakademie', 'T&;2]fX3EN/&v>5', true);
    console.log(`Created auth code ${token} for ${tel}`);
    const params = {
      TableName: process.env.USER_TABLE,
      Item: {
        id: uuid.v1(),
        tel,
        token,
      },
    };
    return await createEntry(params);
  } else {
    throw new UserInputError('', {BAD_PHONE_NUMBER: true});
  }


};

module.exports.triggerAuth = async (root, {tel}) => {
  const params = {
    TableName: process.env.USER_TABLE,
    ExpressionAttributeValues: {
      ":t": tel
    },
    FilterExpression: "tel = :t",
  };

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

