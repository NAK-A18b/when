import getLatestTimes from '../app/nordakademie';

import createTimetableEntry from '../aws/dynamodb/actions/create-time-entry';
import getTimeEntry from '../aws/dynamodb/actions/get-time-entry';
import listTimetable from '../aws/dynamodb/actions/list-time-entrys';

module.exports.updateTimetable = event => {
    getTimeEntry(new Date()).then( (result) => {
        console.log(result);
    });
};
