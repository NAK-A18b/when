const {createEntry} = require('when-aws/dynamodb/actions/create-entry');

const {transformUser} = require('../../../transformers/user');

module.exports.subscribeCenturia = async (root, {centuria}, context) => {
    const {currentUser: user} = context;
    user.centuria = centuria;

    const createParams = {
        TableName: process.env.USER_TABLE,
        Item: user,
    };

    return transformUser((await createEntry(createParams)));
}
