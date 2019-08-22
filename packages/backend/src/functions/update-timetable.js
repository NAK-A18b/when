const {getTimes} = require( '../app/nordakademie');

const {createEntry} = require('when-aws/dynamodb/actions/create-entry');

module.exports.updateTimetable = async event => {
    const centuria = 'A18b';
    const semester = 2;

    const times = await getTimes(centuria, semester);
    let params = {
        TableName: process.env.TIMETABLE_TABLE,
        Item: {
            centuria: centuria,
        },
    };

    if (times.start !== undefined) {
        params.Item.start = times.start;
    }
    if (times.end !== undefined) {
        params.Item.end = times.end;
    }

    return await createEntry(params);
};