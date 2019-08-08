import getTimes from '../app/nordakademie';

import createTimeEntry from '../aws/dynamodb/actions/create-entry';
import getTimeEntry from '../aws/dynamodb/actions/get-entry';
import listTimetable from '../aws/dynamodb/actions/list-time-entrys';
import {generateIdHash} from "../aws/dynamodb/utils";

module.exports.updateTimetable = async event => {
    const centuria = 'A18b';
    const semester = 2;

    const times = await getTimes(centuria, semester);
    const params = {
        TableName: process.env.TIMETABLE_TABLE,
        Item: {
            id: generateIdHash(new Date()),
            start: times.start,
            end: times.end,
            centuria: centuria,
        },
    };

    return await createTimeEntry(params);
};
