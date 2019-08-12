const uuid = require('uuid');
const {getStation} = require('when-backend/src/app/hvv/index');
const {createEntry} = require('when-aws/dynamodb/actions/create-entry');

module.exports.createConnection = async (root, {start, end}) => {
    const startStation = await getStation(start);
    if (startStation.results === undefined) {
        return Promise.reject("Start station not found");
    }

    const endStation = await getStation(end);
    if (endStation.results === undefined) {
        return Promise.reject("End station not found");
    }

    const params = {
        TableName: process.env.CONNECTION_TABLE,
        Item: {
            id: uuid.v1(),
            start: startStation.results[0],
            end: endStation.results[0],
        },
    };

    return await createEntry(params);
};