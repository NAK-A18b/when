import { listEntrys, lambda } from "when-aws";

import { TimeEntry } from "../typings";
import {
  setMinutes,
  setHours,
  subMinutes,
  isWithinInterval,
  addMinutes,
  subHours
} from "date-fns";
import { centuriaUsers } from "../app/utils/user";

const INTERVAL_MINUTES = 45;
const { TIMETABLE_TABLE } = process.env;

if (!TIMETABLE_TABLE) {
  throw Error("Missing Environment Variable: TIMETABLE_TABLE");
}

const controlInterval = (date: Date) => ({
  start: subMinutes(date, INTERVAL_MINUTES),
  end: date
});

const setHoursAndMinutes = (date: Date, hours: number, minutes: number) =>
  setMinutes(setHours(date, hours), minutes);

export default () => {
  const now = new Date();

  listEntrys<TimeEntry>({
    TableName: TIMETABLE_TABLE
  }).then(result => {
    result.forEach(async ({ start, end, centuria }) => {
      const startDate = setHoursAndMinutes(now, start.hour, start.minute);
      const endDate = setHoursAndMinutes(now, end.hour, end.minute);

      const startTrigger = isWithinInterval(now, controlInterval(startDate));
      const endTrigger = isWithinInterval(now, controlInterval(endDate));

      if (!startTrigger && !endTrigger) return;
      const departDate = startTrigger
        ? subHours(startDate, 2)
        : addMinutes(endDate, 15);

      const users = await centuriaUsers(centuria);
      users.forEach(user => {
        lambda
          .invoke({
            FunctionName: "when-notification-app-backend-dev-checkDelay",
            InvocationType: "Event",
            Payload: JSON.stringify({
              id: user.id,
              tel: user.tel,
              connections: user.connections,
              time: {
                hour: departDate.getHours(),
                minute: departDate.getMinutes()
              }
            })
          })
          .send();
      });
    });
  });
};
