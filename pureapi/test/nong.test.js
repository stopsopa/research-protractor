
const path = require('path');

const { By, promise } = require('selenium-webdriver');

describe('nong', async () => {

    let driver;

    beforeAll(async () => {

        driver = await require(path.resolve(__dirname, '..', 'config.js'));
    });

    it('nong', async () => {

        await driver.get('https://stopsopa.github.io/research-protractor/e2e/ng.html');

        let button = await driver.findElement(By.id('go'));

        let div = await driver.findElement(By.css('div'));

        await button.click();

        // await promise.delayed(2000);

        expect(await div.getText()).toBe('clicked');
    });

    afterAll(async () => {

        await driver.quit();
    });
});