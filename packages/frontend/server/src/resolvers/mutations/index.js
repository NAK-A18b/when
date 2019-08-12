const { createSubscriber } = require('./createSubscriber');
const { deleteSubscriber } = require('./deleteSubscriber');
const { createCenturia } = require('./createCenturia');
const { createConnection } = require('./createConnection');
const { subscribeConnection } = require('./subscriberConnection');

module.exports.Mutation = {
  createSubscriber,
  deleteSubscriber,
  createCenturia,
  createConnection,
  subscribeConnection
}