
const { updateUser } = require('./updateUser');
const { createCenturia } = require('./createCenturia');
const { createConnection } = require('./createConnection');

const { subscribeConnection } = require('./subscribeConnection');
const { unsubscribeConnection } = require('./unsubscribeConnection');

const { loginUser } = require('./loginUser');
const { triggerAuth } = require('./triggerAuth');

module.exports.Mutation = {
  updateUser,
  createCenturia,
  createConnection,
  subscribeConnection,
  unsubscribeConnection,
  loginUser,
  triggerAuth,
}