const http = require('http');

module.exports.sendMessage = (tel, message) => {
    return new Promise((resolve, reject) => {
        var username = 'nordakademie';
        var password = 'T&;2]fX3EN/&v>5';
        var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        // new Buffer() is deprecated from v6

        const options = {
            hostname: `35.196.195.229`,
            path: `/sendMessage`,
            method: 'POST',
            headers: {
                'Authorization': auth,
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
        };

        let json = '';
        const req = http.request(options, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => json += chunk);
            res.on('end', () => {
                resolve(json);
            });
        });
        req.on('error', (e) => {
                console.error(`Request to Whatsapp Server failed with ${e}`);
                reject(json);
            }
        );
        req.write(JSON.stringify([{"receiver": tel, "text": message}]));
        req.end();
    });
};