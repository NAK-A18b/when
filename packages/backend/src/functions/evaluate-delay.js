const {sendMessage} = require('when-whatsapp/send-message');
const {generateMessage} = require('../app/hvv/message-generator');
module.exports.evaluateDelay = async event => {
  const {oldEntry, newEntry, tel} = event;
  return Promise.resolve(() => {
    if (JSON.stringify(oldEntry) === JSON.stringify(newEntry)) {
      newEntry.realtimeSchedules.forEach(entry => {
        entry.scheduleElements.forEach(element => {
          if (element.line.name !== 'Umstiegsfußweg') {
            const msg = generateMessage(element);
            console.log(`Sending message "${msg}" to ${tel}`);
            sendMessage(
              tel,
              msg
            );
          }

        });
      });
    }
  });
};
