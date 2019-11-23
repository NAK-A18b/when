const https = require('https');

const getMondayThisOrNextWeek = () => {
  for (let i = 0; i < 7; i++) {
    let today = new Date();
    today.setDate(today.getDate() + i);
    if (today.getDay() === 1) {
      return today;
    }
  }
};

module.exports.getTimes = (zenturie, semester, tomorrow = false) => {
  return new Promise((resolve, reject) => {
    const date = new Date();
    let day = date.getDate();
    if (tomorrow) {
      day++;
    }

    const today = `${date.getFullYear()}${
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    }${day < 10 ? '0' + day : day}`;

    let todayStartTimes = [];
    let todayEndTimes = [];
    const url = `https://cis.nordakademie.de/fileadmin/Infos/Stundenplaene/${zenturie}_${semester}.ics`;
    const req = https.get(url, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => (body += chunk));
      res.on('end', () => {
        console.log('Request to Nordakademie-ICS-file successful');
        const regex = /BEGIN:VEVENT.*?END:VEVENT/gs;
        let match;
        while ((match = regex.exec(body))) {
          // This is necessary to avoid infinite loops with zFero-width matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }

          // The result can be accessed through the `m`-variable.
          match.forEach((match, groupIndex) => {
            const lines = match.split('\n');
            lines.forEach(line => {
              if (line.startsWith('DTSTART')) {
                if (line.includes(today)) {
                  todayStartTimes.push(
                    line.substring(line.lastIndexOf('T') + 1).replace('\r', '')
                  );
                }
              }
              if (line.startsWith('DTEND')) {
                if (line.includes(today)) {
                  todayEndTimes.push(
                    line.substring(line.lastIndexOf('T') + 1).replace('\r', '')
                  );
                }
              }
            });
          });
        }

        const firstTime = Math.min.apply(Math, todayStartTimes);
        const lastTime = Math.max.apply(Math, todayEndTimes);

        if (isFinite(firstTime) && isFinite(lastTime)) {
          resolve({
            start: parseTime(firstTime.toString()),
            end: parseTime(lastTime.toString())
          });
        } else {
          resolve({});
          console.log(`No times found for ${zenturie}`);
        }
      });
    });
    req.on('error', e =>
      console.log('Error while accessing ' + url + ' with ' + e)
    );
    req.end();
  });
};

const parseTime = time => {
  let h;
  let m;
  if (time.length === 5) {
    h = '0' + time.substr(0, 1);
    m = time.substr(1, 2);
  } else {
    h = time.substr(0, 2);
    m = time.substr(2, 2);
  }
  return { hour: parseInt(h), minute: parseInt(m) };
};
