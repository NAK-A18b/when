const { Builder, until, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

exports.getDriver = async () => {
  const service = new chrome.ServiceBuilder('./drivers/chromedriver').build();
  chrome.setDefaultService(service);

  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments("user-data-dir=chrome-data"))
    .build();
};

exports.pageLoad = async (driver) => await driver.wait(until.elementLocated(By.css('input[type="text"]')), 3 * 1000).catch(async error => {
  const elements = await driver.findElements(By.css('img[alt="Scan me!"]')).then(async elements => {
    console.log("QR-Code for login:");
    await console.log(await elements[0].getAttribute("src"));
    process.exit(0);
  });
});