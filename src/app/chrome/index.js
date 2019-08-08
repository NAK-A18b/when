import { Builder, until, By } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

const CHROME_PATH = './drivers/chromedriver';

export const getDriver = async () => {
  const service = new chrome.ServiceBuilder(CHROME_PATH).build();
  chrome.setDefaultService(service);

  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options()
      .addArguments("user-data-dir=chrome-data")
      .addArguments("--disable-extensions"))
    .build();
};

export const pageLoad = async (driver) => await driver.wait(until.elementLocated(By.css('input[type="text"]')), 20000)
  .catch(async error => {
    await driver.findElements(By.css('img[alt="Scan me!"]')).then(async elements => {
      if(elements.size === 1) {
        console.log(`QR-Code for login:`);
        await console.log(await elements[0].getAttribute("src"));
        process.exit(0);
      }
    });
  });
