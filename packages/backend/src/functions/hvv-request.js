const {hvvRequest} = require("../app/hvv/index");

const body = {
    "version": 36,
    "language": "de",
    "start": {
        id: 'Master:97960',
        "type": "STATION",
    },
    "dest": {
        "id": "Master:10950",
        "type": "STATION",
    },
    "time": {
        "date": "heute",
        "time": "jetzt"
    },
    "timeIsDeparture": true,
    "schedulesBefore": 0,
    "schedulesAfter": 1,
    "realtime": "REALTIME",
};

module.exports.hvvRequest = () => {
    hvvRequest("getRoute", body).then(body => {
        console.log(body);
    }).catch(e => {
        console.log(e)
    });
};

