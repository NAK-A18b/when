import request from 'request';

const getMondayThisOrNextWeek = () => {
    for (let i = 0; i < 7; i++) {
        let today = new Date();
        today.setDate(today.getDate() + i);
        if (today.getDay() === 1) {
            return today;
        }
    }
};

const getICalSTARTNextWeek = () => {
    let dates = [];
    for (let i = 0; i < 7; i++) {
        let date = getMondayThisOrNextWeek();
        date.setDate(date.getDate() + i);
        dates.push(`${date.getFullYear()}${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}${date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate()}`);
    }
    return dates;
};

export default async (zenturie, semester) => {
    return new Promise(((resolve, reject) => {
        const date = new Date();
        const today = `${date.getFullYear()}${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}${date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate()}`;
        let todayStartTimes = [];
        let todayEndTimes = [];
        request({
            uri: `https://cis.nordakademie.de/fileadmin/Infos/Stundenplaene/${zenturie}_${semester}.ics`,
        }, async function (error, response, body) {
            const regex = /BEGIN:VEVENT.*?END:VEVENT/sg;
            let m;
            while ((m = regex.exec(body)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                await m.forEach((match, groupIndex) => {
                    const lines = match.split("\n");
                    lines.forEach(line => {
                        if (line.startsWith("DTSTART")) {
                            if(line.includes(today)) {
                                todayStartTimes.push(line.substring(line.lastIndexOf("T") + 1).replace("\r", ""));
                            }
                        }
                        if (line.startsWith("DTEND")) {
                            if(line.includes(today)) {
                                todayEndTimes.push(line.substring(line.lastIndexOf("T") + 1).replace("\r", ""));
                            }
                        }
                    })
                });
            }
            const firstTime = Math.min.apply(Math, todayStartTimes);
            const lastTime = Math.max.apply(Math, todayEndTimes);
            resolve({"start": firstTime, "end": lastTime});
        });
    }));
};