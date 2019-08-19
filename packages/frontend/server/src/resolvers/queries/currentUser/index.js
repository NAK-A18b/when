const { getUser } = require('../../../entitys/user');

module.exports.currentUser = async (root, { id }) => {
  const user = await getUser(id);
  return user ? user : null;
}
