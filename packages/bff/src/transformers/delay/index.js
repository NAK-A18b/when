module.exports.transformDelay = unformattedDelay => {
  const { id, realtimeSchedules } = unformattedDelay;
  const { scheduleElements, start, dest } = realtimeSchedules[0];

  const firstScheduleElement = scheduleElements && scheduleElements[0].from;
  const lastScheduleElement =
    scheduleElements && scheduleElements[scheduleElements.length - 1].to;

  return {
    id,
    start: {
      name: start.name,
      time: firstScheduleElement.depTime.time
    },
    end: {
      name: dest.name,
      time: lastScheduleElement.arrTime.time
    },
    depDelay: firstScheduleElement.depDelay,
    arrDelay: lastScheduleElement.arrDelay
  };
};
