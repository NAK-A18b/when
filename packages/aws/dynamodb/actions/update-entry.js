const { dynamodb } = require('..');

module.exports.updateEntry = params => {
    return new Promise((resolve, reject) => {
        dynamodb.update(params, (error, result) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            return resolve(result);
        });
    });
};