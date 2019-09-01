const { createEntry } = require('when-aws/dynamodb/actions/create-entry');

const { transformUser } = require('../../../transformers/user');

module.exports.updateUser = async (root, args, context) => {
  const { centuria, tel } = args.input;
  const { currentUser } = context;

  if (!currentUser) return;

  if (centuria) currentUser.centuria = centuria;
  if (tel) currentUser.tel = tel;

  const params = {
    TableName: process.env.USER_TABLE,
    Item: {
      ...currentUser,
    }
  }

  const user = (await createEntry(params));
  return transformUser(user);
}
