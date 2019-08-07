import { By } from 'selenium-webdriver';

import { pageLoad } from '../chrome';

const sendMessageWithJS = async (driver, message) => await driver.executeScript(`function sendMessage(t){window.InputEvent=window.Event||window.InputEvent;var e=new InputEvent('input',{bubbles:!0}),n=document.querySelector('div[contenteditable="true"]');n.textContent=t,n.dispatchEvent(e),document.querySelector('span[data-icon="send"]').closest('button').click()}; sendMessage('${message}')`);
const findMessageInput = async (driver) => await driver.findElement(By.css('div[contenteditable="true"]'));
const findErrorPopup = (driver) => driver.findElement(By.css('div[data-animate-modal-body="true"]'));

export const sendMessage = async (driver, message) => {
  const { receiver, text } = message;
  (await findMessageInput(driver)).click();
  console.info(`Sending Message: '${text}' to '${receiver}'`);
  await sendMessageWithJS(driver, text);
  await driver.sleep(1000);
};

export const notifyContacts = async (driver, messages) => {
  const missingContacts = [];
  for (let index in messages) {
    const message = messages[index];
    const { receiver } = message;

    await driver.findElement(By.css(`span[title="${receiver}"]`))
      .then(async (contact) => {
        //Contact with specified phone number found
        await contact.click();
        await sendMessage(driver, message);
      }, () => missingContacts.push(message));
  }
  return missingContacts;
};

exports.notifyNumbers = async (driver, messages) => {
  for (let index in messages) {
    const message = messages[index];
    const { receiver } = message;

    await driver.get(`https://web.whatsapp.com/send?phone=${receiver}`);
    await pageLoad(driver);
    await driver.sleep(1500);

    await findErrorPopup(driver).then(() => {
      console.error(`Number not found: ${receiver}`);
    }, async () => await sendMessage(driver, message));
  }
};