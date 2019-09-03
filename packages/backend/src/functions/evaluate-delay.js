const { sendMessage } = require('when-whatsapp/send-message');

module.exports.evaluateDelay = async event => {
  const { oldEntry, newEntry } = event;

  if (!oldEntry.realtimeSchedules) {
    console.info('First Delay');
    //First delay
  } else {
    if (JSON.stringify(oldEntry) !== JSON.stringify(newEntry)) {
      newEntry.realtimeSchedules.forEach(entry => {
        entry.scheduleElements.forEach(element => {
          const { from, line, to } = element;

          if (
            from.depDelay &&
            line.name !== 'Umstiegsfußweg' &&
            from.depDelay > 59 &&
            to.arrDelay > 59
          ) {
            sendMessage(
              event.tel,
              `${line.name} von ${from.name} nach ${to.name}, ursprünglich um ${
                from.depTime.time
              }, hat eine Verspätung von ${from.depDelay / 60} Minuten 🙄`
            );

            if (to.arrDelay < 120) {
              sendMessage(
                event.tel,
                `Der Zug wird dennoch vorrausichtlich pünktlich in ${to.name} ankommen`
              );
            } else if (to.arrDelay !== from.depDelay) {
              sendMessage(
                event.tel,
                `Der Zug wird in ${
                  to.name
                } mit einer Verspätung von ${to.arrDelay / 60} Minuten ankommen`
              );
            }
          }
        });
      });
    } else {
      //Entries are identical
      console.log(
        'Compared two entries with the result that both are identical'
      );
    }
  }
};
