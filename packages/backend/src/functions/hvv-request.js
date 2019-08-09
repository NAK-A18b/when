const {hvvRequest} = require("../app/hvv/index");

const body = {
    station: {
        name: 'Elmshorn',
        id: 'Master:97960',
        type: 'STATION'
    },
    time: {
        date: 'heute',
        time: 'jetzt'
    },
    serviceTypes: ['RBAHN'],
    maxTimeOffset: 10,
    maxList: 10,
    useRealtime: true,
};

module.exports.hvvRequest = () => {
    hvvRequest("departureList", body).then(body => {
        console.log(body);
    }).catch(e => {
        console.log(e)
    });
};

