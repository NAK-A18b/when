const { listEntrys } = require('when-aws/dynamodb/actions/list-entrys');
const { getEntry } = require('when-aws/dynamodb/actions/get-entry');
const aws = require('aws-sdk');

module.exports.checkTimetable = async event => {
  const now = new Date();
  const hour = now.getHours() + 1;
  const params = {
    TableName: process.env.TIMETABLE_TABLE
  };

  const times = (await listEntrys(params)).Items || [];
  return Promise.all(
    times.map(async time => {
      return new Promise(async (resolve, reject) => {
        const { start, end } = time;
        if (start.hour - hour <= 2 && start.hour - hour >= 0) {
        }

        if (true || (end.hour - hour <= 2 && end.hour - hour >= 0)) {
          let departTime = end;
          if (departTime.minute >= 45) {
            departTime.hour++;
            departTime.minute = 0;
          }

          const allUsers = await listEntrys({
            TableName: process.env.USER_TABLE
          });

          const centuriaUsers = allUsers.Items.filter(
            user => user.centuria === time.centuria
          );

          centuriaUsers.map(user => {
            const lambda = new aws.Lambda({
              apiVersion: '2031',
              endpoint: process.env.IS_OFFLINE
                ? 'http://localhost:3000'
                : undefined,
              region: 'eu-central-1'
            });

            const opts = {
              FunctionName: 'when-notification-app-dev-checkDelay',
              Payload: JSON.stringify({
                id: user.id,
                tel: user.tel,
                connections: user.connections ? user.connections : [],
                time: departTime
              })
            };

            lambda.invoke(opts).send();
          });
        }

        resolve('Done');
      });
    })
  );
};
