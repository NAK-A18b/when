const { Builder, until, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

exports.getDriver = async () => {
  const service = new chrome.ServiceBuilder('./drivers/chromedriver').build();
  chrome.setDefaultService(service);

  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments("user-data-dir=chrome-data"))
    .build();
}

exports.pageLoad = async (driver) => await driver.wait(until.elementLocated(By.css('input[type="text"]')), 20 * 1000);