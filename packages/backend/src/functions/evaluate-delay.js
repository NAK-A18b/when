const {sendMessage} = require("when-whatsapp/send-message");

module.exports.evaluateDelay = async event => {
    let oldEntry = event.oldEntry;
    let newEntry = event.newEntry;
    if (!oldEntry.hasOwnProperty('Item')) {
        //First delay
    } else {
        oldEntry = oldEntry.Item;
        newEntry = newEntry.Item;
        if (JSON.stringify(oldEntry) !== JSON.stringify(newEntry)) {
            newEntry.realtimeSchedules.forEach(e => {
                e.scheduleElements.forEach(s => {
                    delete s.paths;
                    if (s.from.hasOwnProperty('depDelay') && s.line.name !== 'Umstiegsfußweg' && s.from.depDelay > 59 && s.to.arrDelay > 59) {
                        sendMessage(event.tel, `${s.line.name} von ${s.from.name} nach ${s.to.name}, ursprünglich um ${s.from.depTime.time}, hat eine Verspätung von ${(s.from.depDelay) / 60} Minuten 🙄`);
                        if (s.to.arrDelay < 120) {
                            sendMessage(event.tel, `Der Zug wird dennoch vorrausichtlich pünktlich in ${s.to.name} ankommen`);
                        } else if (s.to.arrDelay !== s.from.depDelay) {
                            sendMessage(event.tel, `Der Zug wird in ${s.to.name} mit einer Verspätung von ${(s.to.arrDelay) / 60} Minuten ankommen`)
                        }
                    }
                });
            });
        } else {
            //Entries are identical
            console.log("Compared two entries with the result that both are identical");
        }
    }

};