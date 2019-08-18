const { createUser } = require('./createUser');
const { deleteUser } = require('./deleteUser');
const { createCenturia } = require('./createCenturia');
const { createConnection } = require('./createConnection');

const { subscribeConnection } = require('./subscribeConnection');
const { unsubscribeConnection } = require('./unsubscribeConnection');

const { loginUser } = require('./loginUser');
const { registerUser } = require('./registerUser');

module.exports.Mutation = {
  createUser,
  deleteUser,
  createCenturia,
  createConnection,
  subscribeConnection,
  unsubscribeConnection,
  loginUser,
  registerUser,
}