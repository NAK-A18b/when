const { By } = require('selenium-webdriver');

const { pageLoad } = require('../chrome');

const sendMessageWithJS = async (driver, message) => await driver.executeScript(`function sendMessage(t){window.InputEvent=window.Event||window.InputEvent;var e=new InputEvent('input',{bubbles:!0}),n=document.querySelector('div[contenteditable="true"]');n.textContent=t,n.dispatchEvent(e),document.querySelector('span[data-icon="send"]').closest('button').click()}; sendMessage('${message}')`);
const findMessageInput = async (driver) => await driver.findElement(By.css('div[contenteditable="true"]'));

exports.sendMessage = sendMessage = async (driver, text) => {
  (await findMessageInput(driver)).click();
  await sendMessageWithJS(driver, text);
  await driver.sleep(1000);
};

exports.notifyContacts = async (driver, messages) => {
  const missingContacts = [];
  for (let index in messages) {
    const { receiver, text } = messages[index];

    await driver.findElement(By.css(`span[title="${receiver}"]`))
      .then(async (contact) => {
        //Contact with specified phone number found
        await contact.click();
        await sendMessage(driver, text);
      }, () => missingContacts.push({ receiver, text }));
  }
  return missingContacts;
};

exports.notifyNumbers = async (driver, messages) => {
  for (let index in messages) {
    const { receiver, text } = messages[index];
    await driver.get(`https://web.whatsapp.com/send?phone=${receiver}`);
    await pageLoad(driver);
    await driver.sleep(1500);
    await sendMessage(driver, text);
  }
};