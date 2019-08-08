import getTimes from '../app/nordakademie';

import { createEntry } from 'when-aws/dynamodb/actions/create-entry';
import { generateDateHash } from "when-aws/dynamodb/utils";

module.exports.updateTimetable = async event => {
    const centuria = 'A18b';
    const semester = 2;

    const times = await getTimes(centuria, semester);
    const params = {
        TableName: process.env.TIMETABLE_TABLE,
        Item: {
            id: generateDateHash(new Date()),
            start: times.start,
            end: times.end,
            centuria: centuria,
        },
    };

    return await createEntry(params);
};
