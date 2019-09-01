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
          delete element.paths;
          if (
            element.from.depDelay &&
            element.line.name !== 'Umstiegsfußweg' &&
            element.from.depDelay > 59 &&
            element.to.arrDelay > 59
          ) {
            sendMessage(
              event.tel,
              `${element.line.name} von ${element.from.name} nach ${
                element.to.name
              }, ursprünglich um ${
                element.from.depTime.time
              }, hat eine Verspätung von ${element.from.depDelay /
                60} Minuten 🙄`
            );

            if (element.to.arrDelay < 120) {
              sendMessage(
                event.tel,
                `Der Zug wird dennoch vorrausichtlich pünktlich in ${element.to.name} ankommen`
              );
            } else if (element.to.arrDelay !== element.from.depDelay) {
              sendMessage(
                event.tel,
                `Der Zug wird in ${
                  element.to.name
                } mit einer Verspätung von ${element.to.arrDelay /
                  60} Minuten ankommen`
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
