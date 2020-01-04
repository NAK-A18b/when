import { getTimes } from "../app/nordakademie";

import { createEntry, listEntrys } from "when-aws";

import { Centuria } from "../typings";

const { TIMETABLE_TABLE, CENTURIA_TABLE } = process.env;

if (!CENTURIA_TABLE) {
  throw Error("Missing Environment Variable: CENTURIA_TABLE");
}

if (!TIMETABLE_TABLE) {
  throw Error("Missing Environment Variable: TIMETABLE_TABLE");
}

export default async () => {
  const centurias = await listEntrys<Centuria>({
    TableName: CENTURIA_TABLE
  });
  if (!centurias) return;

  return Promise.all(
    centurias.map(async ({ name, semester }) => {
      const times = await getTimes(name, semester, false);
      if (!times) return;

      return createEntry({
        TableName: TIMETABLE_TABLE,
        Item: {
          centuria: name,
          start: times.start,
          end: times.end
        }
      });
    })
  );
};
