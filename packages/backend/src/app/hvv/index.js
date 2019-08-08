const { hvvRequest }  = require("./hvvRequest");

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
    useRealtime: true
};

hvvRequest("departureList", JSON.stringify(body)).then(body => {
   console.log(body);
}).catch(e => {
    console.log(e)
});