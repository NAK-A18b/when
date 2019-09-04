const { getUser } = require('../../../entitys/user');
const { transformUser } = require('../../../transformers/user');

module.exports.currentUser = async (root, args, context) => {
  const { currentUser: user } = context;
  return user ? transformUser(user) : null;
};
