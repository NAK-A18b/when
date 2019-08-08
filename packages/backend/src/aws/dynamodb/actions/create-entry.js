import {generateIdHash} from '../utils';
import dynamodb from '..';

export default params => {
    return new Promise((resolve, reject) => {
        dynamodb.put(params, (error) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            console.info(`Put item into Table: ${params.Item.id}`);
            resolve(params.Item);
        });
    });
};