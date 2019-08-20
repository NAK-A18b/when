const {hvvRequest} = require("../app/hvv/index");

module.exports.routeRequest = event => {
    let body = {
        "version": 36,
        "language": "de",
        "start": event.start,
        "dest": event.dest,
        "time": {
            "date": "heute",
            "time": "jetzt"
        },
        "timeIsDeparture": true,
        "schedulesBefore": 0,
        "schedulesAfter": 0,
        "realtime": "REALTIME",
    };
    hvvRequest("getRoute", body).then(body => {
        console.log(body.realtimeSchedules);
    }).catch(e => {
        console.log(e)
    });
};