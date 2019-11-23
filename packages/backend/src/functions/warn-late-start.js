const {getTimes} = require( '../app/nordakademie');
const {sendMessage} = require("when-whatsapp/send-message");

module.exports.warnLateStart = () => {
    getTimes('A18b', 2, true).then(time => {
        if (time.start.hour !== 9 || time.start.minute !== 15) {
            sendMessage('491604615070', `⚠️ Morgen beginnt die erste Vorlesung um *${time.start.hour}:${time.start.minute}*`)
        }
    })
};