import {generateIdHash} from '../utils';
import dynamodb from '..';

export default params => {
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