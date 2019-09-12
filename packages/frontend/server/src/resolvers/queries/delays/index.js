const { listEntrys } = require('when-aws/dynamodb/actions/list-entrys');

const { transformDelay } = require('../../../transformers/delay');

const userIsSubscribedTo = user => delay => user.connections.includes(delay.id);
const hasDelay = delay => !!delay.depDelay;

module.exports.delays = async (root, args, context) => {
  const { currentUser: user } = context;

  const unformattedDelays = (await listEntrys({
    TableName: process.env.DELAY_TABLE
  })).Items;

  return unformattedDelays
    .map(transformDelay)
    .filter(userIsSubscribedTo(user))
    .filter(hasDelay);
};
