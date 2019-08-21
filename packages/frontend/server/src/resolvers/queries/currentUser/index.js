const { getUser } = require('../../../entitys/user');
const { transformUser } = require('../../../transformers/user');

module.exports.currentUser = async (root, { id }) => {
  const user = await getUser(id);
  return user ? await transformUser(user) : null;
}
