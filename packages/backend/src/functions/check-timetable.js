const {listEntrys} = require('when-aws/dynamodb/actions/list-entrys');
const {getEntry} = require('when-aws/dynamodb/actions/get-entry');
const aws = require("aws-sdk");

module.exports.checkTimetable = async event => {
    const params = {
        TableName: process.env.TIMETABLE_TABLE
    };

    const now = new Date();
    const hour = now.getHours() + 1;

    const times = (await listEntrys(params)).Items || [];
    times.map(async time => {
        const schoolStart = parseTime(time.start.toString());
        const schoolEnd = parseTime(time.end.toString());
        if (schoolStart.hour - hour <= 2 && schoolStart.hour - hour >= 0) {

        }
        console.log(time);
        if (true || schoolEnd.hour - hour <= 2 && schoolEnd.hour - hour >= 0) {
            let departTime = schoolEnd;
            if (departTime.minute >= 45) {
              departTime.hour++;
              departTime.minute = 0;
            }

            const allUsers = await listEntrys({
                TableName: process.env.USER_TABLE,
            });

            centuriaUsers = allUsers.filter(user => user.centuria === time.centuria);
            centuriaUsers.map(async user => {
                const lambda = new aws.Lambda({
                    apiVersion: '2031',
                    endpoint: process.env.IS_OFFLINE ? 'http://localhost:3000' : undefined,
                    region: 'us-east-1',
                });
                const opts = {
                    FunctionName: 'when-notification-app-dev-checkDelay',
                    InvocationType: 'Event',
                    Payload: JSON.stringify({
                        id: user.Item.id,
                        tel: user.Item.tel,
                        connections: user.Item.connections,
                        time: departTime
                    })
                };
                lambda.invoke(opts, (err, data) => {
                    if (err) {
                        console.log('Error while invoking function checkDelay: ' + err);
                    } else if (data) {
                        console.log('checkDelay successful invoked');
                    }
                });
            });
        }
    })
}

const parseTime = time => {
    let h;
    let m;
    if (time.length === 5) {
        h = '0' + time.substr(0, 1);
        m = time.substr(1, 2);
    } else {
        h = time.substr(0, 2);
        m = time.substr(2, 2);
    }
    return {hour: parseInt(h), minute: parseInt(m)};
};