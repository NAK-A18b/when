const {getTimes} = require( '../app/nordakademie');

const {createEntry} = require('when-aws/dynamodb/actions/create-entry');
const {listEntrys} = require('when-aws/dynamodb/actions/list-entrys');

module.exports.updateTimetable = async event => {
    const centurias = (await listEntrys({
        TableName: process.env.CENTURIA_TABLE
    })).Items;

    if (!centurias) return;
    return Promise.all(centurias.map( async (centuria) => {
        const { name, semester } = centuria;
    
        const times = await getTimes(name, semester);
        let params = {
            TableName: process.env.TIMETABLE_TABLE,
            Item: {
                centuria: name,
            },
        };
    
        if (times.start !== undefined) {
            params.Item.start = times.start;
        }
        if (times.end !== undefined) {
            params.Item.end = times.end;
        }

        return await createEntry(params);
    }))
};