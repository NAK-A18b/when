import fetch from 'node-fetch';
import { sync } from 'node-ical';
import { isToday, isTomorrow } from 'date-fns';

import { Event } from '../../typings';

export const getTimes = async (
  zenturie: string,
  semester: number,
  tomorrow = false
) => {
  const url = `https://cis.nordakademie.de/fileadmin/Infos/Stundenplaene/${zenturie}_${semester}.ics`;
  const events: Event[] = await fetch(url)
    .then(res => res.buffer())
    .then(buffer => buffer.toString())
    .then(icsData => {
      const eventData = sync.parseICS(icsData);
      return Object.keys(eventData).map(key => eventData[key]);
    });

  const timesFilter = tomorrow ? isTomorrow : isToday;

  const startTimes = events.map(({ start }) => start);
  const todayStartTimes = startTimes.filter(timesFilter);
  const startTime = todayStartTimes.sort((a, b) => (a > b ? 1 : -1))[0];

  const endTimes = events.map(({ end }) => end);
  const todayEndTimes = endTimes.filter(timesFilter);
  const endTime = todayEndTimes.sort((a, b) => (a < b ? 1 : -1))[0];

  if (startTime && endTime) {
    return {
      start: {
        hour: startTime.getHours(),
        minute: startTime.getMinutes()
      },
      end: {
        hour: endTime.getHours(),
        minute: endTime.getMinutes()
      }
    };
  }
};
