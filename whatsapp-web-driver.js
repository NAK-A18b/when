'use strict';

const {Builder, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function sendMessageWithJS(driver, message) {
    await driver.executeScript(`function sendMessage(t){window.InputEvent=window.Event||window.InputEvent;var e=new InputEvent('input',{bubbles:!0}),n=document.querySelector('div[contenteditable="true"]');n.textContent=t,n.dispatchEvent(e),document.querySelector('span[data-icon="send"]').closest('button').click()}; sendMessage('` + message +`')`);
}

const service = new chrome.ServiceBuilder('./drivers/chromedriver').build();
chrome.setDefaultService(service);

var sendMessage = async (messages) => {
    (async function () {
        let driver;
        try {
            driver = await new webdriver.Builder()
                .forBrowser('chrome')
                .setChromeOptions(
                    new chrome.Options().addArguments("user-data-dir=chrome-data"))
                .build();
            await driver.get('https://web.whatsapp.com/');

            await driver.wait(until.elementLocated(By.css("input[type=\"text\"]")), 20 * 1000)
            //Loop trough contacts
            var missingContacts = [];
            await Promise.all(messages.map( async (message) => {
                const { receiver, text } = message;

                await driver.findElement(webdriver.By.css("span[title=\"" + receiver + "\"]")).then(async (contact) => {
                    //Contact with specified phone number found
                    await contact.click();
                    var input = driver.findElement(webdriver.By.css("div[contenteditable=\"true\"]"));
                    input.click();
                    await sendMessageWithJS(driver, text);
                }, (error) => {
                    //Contact not found
                    //Create a new contact later
                    missingContacts.push(message)
                });
            }));
            await Promise.all(missingContacts.map( async (missing) => {
                const { receiver, text } = missing;

                await driver.get('https://web.whatsapp.com/send?phone=' + receiver);
                return driver.wait(until.elementLocated(By.css("input[type=\"text\"]")), 20 * 1000).then(async success => {
                    await driver.findElement(webdriver.By.css("span[title=\"" + receiver + "\"]")).then(async (contact) => {
                        //Contact with specified phone number found
                        await driver.sleep(1500);
                        var input = driver.findElement(webdriver.By.css("div[contenteditable=\"true\"]"));
                        input.click();
                        await sendMessageWithJS(driver, text);
                    }, (error) => {
                        console.log("No contact found for " + receiver);
                    });
                }).catch(error => {
                    console.log(error);
                });
            }));

            driver.close();
        } finally {
            //await driver && driver.quit();
        }
    })().then(_ => console.log(''), err => console.error('ERROR: ' + err));

    //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    //await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
};

const messages = [{ receiver: 'Elias', text: 'Hey nimm noch einen Zug 🚈' }];
sendMessage(messages);
