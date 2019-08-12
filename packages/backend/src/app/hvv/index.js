const crypto = require('crypto');
const request = require('request');

hvvRequest = (method, body) => {
    return new Promise((resolve, reject) => {
        //Set HVV API Version
        body.version = process.env.HVV_API_VERSION;
        body = JSON.stringify(body);
        //Generate hash needed for hvv api server authentication
        const secret = 'j/o!f$R@a2au';
        const hash = crypto.createHmac('sha1', secret)
            .update(body)
            .digest('base64');

        const options = {
            url: `https://api-test.geofox.de/gti/public/${method}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'geofox-auth-type': 'HmacSHA1',
                'Connection': 'Keep-Alive',
                'geofox-auth-user': 'eliashuehne',
                'geofox-auth-signature': hash
            },
            body: body
        };

        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(`Request to HVV-API successful with method ${method}`);
                resolve(JSON.parse(body));
            } else {
                console.error(`Request to HVV-API failed with ${body}`);
                reject(body);
            }
        }

        request(options, callback);
    });

};

module.exports.hvvRequest = hvvRequest;

module.exports.getStation = name => {
    if (name === '') {
        return {};
    }

    const params = {
        theName: {
            name: name,
            type: 'STATION'
        },
        maxList: 1
    };

    return hvvRequest("checkName", params);
};
