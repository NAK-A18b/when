const { generateHash } = require('when-aws/dynamodb/utils');
const { getEntry } = require('when-aws/dynamodb/actions/get-entry');

const { env } = process;

const fetchAttribute = async (TableName, Key) => (await getEntry({ TableName, Key })).Item

module.exports.transformUser = async (user) => {
  const { centuria: centuriaId, connections: connnectionIds } = user;

  user.centuria = await fetchAttribute(env.CENTURIA_TABLE, { id: centuriaId});
  user.connections = await Promise.all(
    !connnectionIds ? [] : connnectionIds.map(async (id) => 
      await fetchAttribute(env.CONNECTION_TABLE, { id }))
  );
  return user;
}
