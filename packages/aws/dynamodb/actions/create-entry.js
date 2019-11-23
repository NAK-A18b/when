const { dynamodb } = require('..');

module.exports.createEntry = params => {
    return new Promise((resolve, reject) => {
        dynamodb.put(params, (error) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            console.info(`Put item into table: ${params.TableName}`);
            resolve(params.Item);
        });
    });
};