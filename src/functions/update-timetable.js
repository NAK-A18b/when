import getTimes from '../app/nordakademie';

import createTimetableEntry from '../aws/dynamodb/actions/create-time-entry';
import getTimeEntry from '../aws/dynamodb/actions/get-time-entry';
import listTimetable from '../aws/dynamodb/actions/list-time-entrys';

module.exports.updateTimetable = async event => {
    const centuria = 'A18b';
    const semester = 2;

    return await createTimetableEntry(new Date(), centuria, await getTimes(centuria,semester));
};
