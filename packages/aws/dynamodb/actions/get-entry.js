const { dynamodb } = require('..');

module.exports.getEntry = params => {
    return new Promise((resolve, reject) => {
        dynamodb.get(params, (error, result) => {
                if (error) {
                    console.error(error);
                    return reject(error);
                    ;
                }
                resolve(result);
            }
        )
    });
};