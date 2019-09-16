const {sendMessage} = require('when-whatsapp/send-message');
const {generateMessage} = require('../app/hvv/message-generator');
module.exports.evaluateDelay = event => {
  const {oldEntry, newEntry, tel} = event;
  if (JSON.stringify(oldEntry) !== JSON.stringify(newEntry)) {
    newEntry.realtimeSchedules.forEach(entry => {
      entry.scheduleElements.forEach(element => {
        if (element.line.name !== 'Umstiegsfußweg') {
          const msg = generateMessage(element);
          if (msg) {
            console.log(`Sending message "${msg}" to ${tel}`);
            sendMessage(
              tel,
              msg
            );
          }
        }
      });
    });
  }
};
