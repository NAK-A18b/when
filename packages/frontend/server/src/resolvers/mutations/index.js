const { createSubscriber } = require('./createSubscriber');
const { deleteSubscriber } = require('./deleteSubscriber');
const { createCenturia } = require('./createCenturia');
const { createConnection } = require('./createConnection');
const { subscribeConnection } = require('./subscribeConnection');
const { unsubscribeConnection } = require('./unsubscribeConnection');

module.exports.Mutation = {
  createSubscriber,
  deleteSubscriber,
  createCenturia,
  createConnection,
  subscribeConnection,
  unsubscribeConnection,
}