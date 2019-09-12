const { users } = require('./users');
const { centurias } = require('./centurias');
const { connections } = require('./connections');
const { currentUser } = require('./currentUser');
const { delays } = require('./delays');

module.exports.Query = {
  users,
  centurias,
  connections,
  currentUser,
  delays
};
