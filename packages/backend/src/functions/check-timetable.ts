import { listEntrys } from 'when-aws';

import { TimeEntry, User } from '../typings';
import { lambda } from '../app/helper';
import {
  getMinutes,
  getHours,
  setMinutes,
  setHours,
  addMinutes,
  subMinutes,
  isWithinInterval
} from 'date-fns';
import { centuriaUsers } from '../app/utils/user';

const { TIMETABLE_TABLE, USER_TABLE } = process.env;

if (!TIMETABLE_TABLE) {
  throw Error('Missing Environment Variable: TIMETABLE_TABLE');
}

export const checkTimetable = () => {
  const now = new Date();

  listEntrys<TimeEntry>({
    TableName: TIMETABLE_TABLE
  }).then(result => {
    result.map(async ({ start, end, centuria }) => {
      const startDate = setMinutes(
        setHours(new Date(), start.hour),
        start.minute
      );
      const endDate = setMinutes(setHours(new Date(), end.hour), end.minute);

      const checkStartDate = subMinutes(startDate, 45);
      const checkEndDate = subMinutes(endDate, 45);

      const startTrigger = isWithinInterval(now, {
        start: checkStartDate,
        end: startDate
      });
      const endTrigger = isWithinInterval(now, {
        start: checkEndDate,
        end: endDate
      });

      if (!startTrigger && !endTrigger) return;
      const departDate = startTrigger ? startDate : endDate;

      const users = await centuriaUsers(centuria);
      users.forEach(user => {
        callCheckDelay({
          id: user.id,
          tel: user.tel,
          connections: user.connections ? user.connections : [],
          time: { hour: departDate.getHours(), minute: departDate.getMinutes() }
        });
      });
    });
  });
};

type CheckDelayPayload = {
  id: string;
  tel: string;
  connections: string[];
  time: { hour: number; minute: number };
};

const callCheckDelay = (payload: CheckDelayPayload) => {
  const opts = {
    FunctionName: 'when-notification-app-backend-dev-checkDelay',
    InvocationType: 'Event',
    Payload: JSON.stringify(payload)
  };
  lambda.invoke(opts).send();
};
