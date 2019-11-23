const { dynamodb } = require('..');

module.exports.deleteEntry = params => {
    return new Promise((resolve, reject) => {
        dynamodb.delete(params, (error) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(params.Item);
        });
    });
};