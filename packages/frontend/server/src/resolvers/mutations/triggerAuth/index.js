const request = require('request');
const { parsePhoneNumberFromString } = require('libphonenumber-js/max');

const { UserInputError } = require("apollo-server-errors");

const { createUser, findUserByTel } = require('../../../entitys/user');

const { createEntry } = require('when-aws/dynamodb/actions/create-entry');

module.exports.randomToken = randomToken = (min = 1000, max = 9999) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const tokenNotification = ({tel, token}) => {
  const phoneNumber = parsePhoneNumberFromString(tel, 'DE');
  if (phoneNumber !== undefined && phoneNumber.isValid() && phoneNumber.getType() === 'MOBILE') {
    tel = phoneNumber.number.substr(1);

    console.log(`Creating auth code ${token} for ${tel}`);
    return request.post('http://35.196.195.229/sendMessage', {
      json: [{"receiver": tel, "text": `👋 Dein Anmeldecode lautet *${token}* und ist eine Minute lang gültig`}]
    }, (error, res, body) => {
      if (error) {
        console.error(error);
        return;
      }
    }).auth('nordakademie', 'T&;2]fX3EN/&v>5', true);
  } else {
    throw new UserInputError('', { BAD_PHONE_NUMBER: true });
  }
}

module.exports.triggerAuth = async (root, { tel }) => {
  const phoneNumber = parsePhoneNumberFromString(tel, 'DE');
  if (phoneNumber !== undefined && phoneNumber.isValid() && phoneNumber.getType() === 'MOBILE') {
    tel = phoneNumber.number.substr(1);

    let user = await findUserByTel(tel);

    if (!user) {
      user = await createUser({ tel });
    } else {
      user.token = randomToken();
      user = await createEntry({
        TableName: process.env.USER_TABLE,
        Item: user,
      });
    }

    await tokenNotification(user);
    return true;
  }
};

