const request = require('request');

module.exports.sendMessage = (tel, message) => {
    return request.post('http://35.196.195.229/sendMessage', {
        json: [{"receiver": tel, "text": message}]
    }, (error, res, body) => {
        if (error) {
            console.error(error);
            return;
        } else {
            console.log(`Send message to ${tel}`);
        }
    }).auth('nordakademie', 'T&;2]fX3EN/&v>5', true);
};