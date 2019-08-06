'use strict';

const { getDriver, pageLoad } = require('./src/chrome');
const { notifyNumbers, notifyContacts } = require('./src/whatsapp');

const sendMessage = async (messages) => {
    let driver;
    try {
        driver = await getDriver();
        await driver.get('https://web.whatsapp.com/');
        await pageLoad(driver);

        //Loop trough contacts
        const missingContacts = await notifyContacts(driver, messages);
        await notifyNumbers(driver, missingContacts);

        driver.close();
    } catch (e) {
        console.error(`ERROR: ${e}`);
        //driver.close();
    }
};

const messages = [{ receiver: '+49 160 4615070', text: '🚝' }, { receiver: '+49 176 34663396', text: '🚝' }];
sendMessage(messages);
