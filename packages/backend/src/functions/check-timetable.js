const {listEntries} = require('when-aws/dynamodb/actions/list-entries');

module.exports.checkTimetable = async event => {
    const params = {
        TableName: process.env.CONNECTION_TABLE
    };

    const response = (await listEntries(params)).Items || [];
    console.log(response);
};

