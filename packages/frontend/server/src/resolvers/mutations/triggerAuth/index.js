const { sendMessage } = require('when-whatsapp/send-message');
const { parsePhoneNumberFromString } = require('libphonenumber-js/max');

const { UserInputError } = require('apollo-server-errors');

const {
  createUser,
  findUserByTel,
  updateUser
} = require('../../../entitys/user');

module.exports.randomToken = randomToken = (min = 1000, max = 9999) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const tokenNotification = user => {
  let tel = user.tel;
  let token = user.token;
  console.log(`Creating auth code ${token} for ${tel}`);
  sendMessage(
    tel,
    `👋 Dein Anmeldecode lautet *${token}* und ist eine Minute lang gültig`
  );
};

module.exports.triggerAuth = async (root, { tel }) => {
  const phoneNumber = parsePhoneNumberFromString(tel, 'DE');
  if (
    phoneNumber &&
    phoneNumber.isValid() &&
    phoneNumber.getType() === 'MOBILE'
  ) {
    tel = phoneNumber.number.substr(1);
    let user = await findUserByTel(tel);

    if (!user) {
      user = await createUser({ tel });
    } else {
      user.token = randomToken();
      user = await updateUser(user);
    }

    tokenNotification(user);
    return tel;
  } else {
    throw new UserInputError('Error on AuthTrigger', {
      BAD_PHONE_NUMBER: true
    });
  }
};
