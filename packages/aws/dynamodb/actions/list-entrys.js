const { dynamodb } = require('..');

module.exports.listEntrys = params => {
    return new Promise((resolve, reject) => {
        dynamodb.scan(params, (error, result) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            return resolve(result);
        });
    });
};