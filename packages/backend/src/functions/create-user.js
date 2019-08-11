const {createEntry} = require('when-aws/dynamodb/actions/create-entry');

module.exports.createUser = (event, context, callback) => {
    let params = {
        TableName: process.env.USERS_TABLE,
        Item: {
            phone: event.queryStringParameters.phone
        }
    };

    if (event.queryStringParameters.alias !== undefined) {
        params.Item.alias = event.queryStringParameters.alias;
    }
    if (event.queryStringParameters.centuria !== undefined) {
        params.Item.centuria = event.queryStringParameters.centuria;
    }
    if (event.queryStringParameters.connection !== undefined) {
        params.Item.connection = event.queryStringParameters.connection;
    }

    createEntry(params).then(item => {
      const response = {
          statusCode: 200
      };
      callback(null, response);
    }).catch(error => {
        const response = {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    });
};