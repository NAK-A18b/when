const { updateUser } = require('./updateUser');
const { createCenturia } = require('./createCenturia');
const { createConnection } = require('./createConnection');

const { subscribeConnection } = require('./subscribeConnection');
const { subscribeCenturia } = require('./subscribeCenturia');
const { unsubscribeConnection } = require('./unsubscribeConnection');

const { loginUser } = require('./loginUser');
const { triggerAuth } = require('./triggerAuth');

module.exports.Mutation = {
  updateUser,
  createCenturia,
  createConnection,
  subscribeConnection,
  subscribeCenturia,
  unsubscribeConnection,
  loginUser,
  triggerAuth
};
