const { generateHash } = require('when-aws/dynamodb/utils');
const { getEntry } = require('when-aws/dynamodb/actions/get-entry');

const { env } = process;

const fetchAttribute = async (TableName, Key) => (await getEntry({ TableName, Key })).Item

module.exports.transformSubscriber = async (subscriber) => {
  const { centuria: centuriaId, connections: connnectionIds } = subscriber;

  subscriber.centuria = await fetchAttribute(env.CENTURIA_TABLE, { id: centuriaId});
  subscriber.connections = await Promise.all(
    !connnectionIds ? [] : connnectionIds.map(async (id) => 
      await fetchAttribute(env.CONNECTION_TABLE, { id }))
  );
  return subscriber;
}
