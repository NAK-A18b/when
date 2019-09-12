const {listEntrys} = require('when-aws/dynamodb/actions/list-entrys');
const {getEntry} = require('when-aws/dynamodb/actions/get-entry');

const {lambda} = require('../app/helper');

module.exports.checkTimetable = event => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const params = {
    TableName: process.env.TIMETABLE_TABLE
  };

  listEntrys(params).then(result => {
    const times = result.Items || [];
    times.map(async time => {
      let {start, end} = time;
      //Add 15 minutes for walking
      if (end.minute >= 45) {
        end.hour++;
        end.minute = end.minute + 15 - 60;
      }

      //Start checking 45 minutes before end
      const startEnd = {
        hour: end.minute < 45 ? end.hour - 1 : end.hour,
        minute: end.minute < 45 ? 60 - (45 - end.minute) : end.minute - 45
      };

      const endCondition = true || (hour <= end.hour && hour >= startEnd.hour) &&
        (end.minute >= 45 ? (minute <= end.minute && minute >= startEnd.minute) : (
          (minute >= startEnd.minute && hour === startEnd.hour) || (minute <= end.minute && hour !== startEnd.hour)));

      const startCondition = false;
      if (startCondition || endCondition) {
        const allUsers = await listEntrys({
          TableName: process.env.USER_TABLE
        });
        const centuriaUsers = allUsers.Items.filter(
          user => user.centuria === time.centuria
        );
        if (startCondition) {
          let departTime = start;
          departTime.hour = departTime >= 2 ? departTime.hour -= 2 : departTime.hour;
          centuriaUsers.forEach(user => {
            callCheckDelay({
              id: user.id,
              tel: user.tel,
              connections: user.connections ? user.connections : [],
              time: departTime
            });
          });
        }
        if (endCondition) {
          let departTime = end;
          if (departTime.minute >= 45) {
            departTime.hour++;
            departTime.minute = 0;
          } else {
            departTime.minute += 15;
          }
          centuriaUsers.forEach(user => {
            callCheckDelay({
              id: user.id,
              tel: user.tel,
              connections: user.connections ? user.connections : [],
              time: departTime
            });
          });
        }
      }
    })
  });

};

const callCheckDelay = payload => {
  const opts = {
    FunctionName: 'when-notification-app-backend-dev-checkDelay',
    InvocationType: 'Event',
    Payload: JSON.stringify(payload)
  };
  lambda.invoke(opts).send();
};
