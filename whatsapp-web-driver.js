'use strict';

const {Builder, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function sendMessageWithJS(driver, message) {
    await driver.executeScript(`function sendMessage(t){window.InputEvent=window.Event||window.InputEvent;var e=new InputEvent('input',{bubbles:!0}),n=document.querySelector('div[contenteditable="true"]');n.textContent=t,n.dispatchEvent(e),document.querySelector('span[data-icon="send"]').closest('button').click()}; sendMessage('` + message +`')`);
}

const service = new chrome.ServiceBuilder('./drivers/chromedriver').build();
chrome.setDefaultService(service);

var sendMessage = async (json) => {
    (async function () {
        let driver;
        try {
            driver = await new webdriver.Builder()
                .forBrowser('chrome')
                .setChromeOptions(
                    new chrome.Options().addArguments("user-data-dir=chrome-data"))
                .build();
            await driver.get('https://web.whatsapp.com/');
            return driver.wait(until.elementLocated(By.css("input[type=\"text\"]")), 20 * 1000).then(async success => {
                //Loop trough contacts
                var missingContacts = {};
                for (const key in json) {
                    await driver.findElement(webdriver.By.css("span[title=\"" + key + "\"]")).then(async (contact) => {
                        //Contact with specified phone number found
                        await contact.click();
                        var input = driver.findElement(webdriver.By.css("div[contenteditable=\"true\"]"));
                        input.click();
                        await sendMessageWithJS(driver, json[key]);
                    }, (error) => {
                        //Contact not found
                        //Create a new contact later
                        missingContacts[key] = json[key];
                    });
                }
                for (const missing in missingContacts) {
                    await driver.get('https://web.whatsapp.com/send?phone=' + missing);
                    return driver.wait(until.elementLocated(By.css("input[type=\"text\"]")), 20 * 1000).then(async success => {
                        await driver.findElement(webdriver.By.css("span[title=\"" + missing + "\"]")).then(async (contact) => {
                            //Contact with specified phone number found
                            await driver.sleep(1500);
                            var input = driver.findElement(webdriver.By.css("div[contenteditable=\"true\"]"));
                            input.click();
                            await sendMessageWithJS(driver, missingContacts[missing]);
                        }, (error) => {
                            console.log("No contact found for " + missing);
                        });
                    }).catch(error => {
                        console.log(error);
                    });

                }
            }).catch(async error => {
                console.log(error);
            });


        } finally {
            //await driver && driver.quit();
        }
    })().then(_ => console.log(''), err => console.error('ERROR: ' + err));

    //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    //await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
};

sendMessage({"Elias": "Hallo 😍, hier sind ein paar Züge: 🚈🚃🚃"});
