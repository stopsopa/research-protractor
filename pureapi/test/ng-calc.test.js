
const path = require('path');

const { By, promise, until } = require('selenium-webdriver');

describe('ng-calc', async () => {

    let driver;

    beforeAll(async () => {

        driver = await require(path.resolve(__dirname, '..', 'config.js'));
    });

    it('calc', async () => {

        await driver.get('https://stopsopa.github.io/research-protractor/e2e/angular-calc/calc.html');

        await promise.delayed(1000);

        let a = await driver.findElement(By.css('[ng-model="second"]'));

        let b = await driver.findElement(By.css('[ng-model="first"]'));

        await a.sendKeys("89");

        await b.sendKeys("74");

        // await promise.delayed(1000);

        let button = await driver.findElement(By.id('gobutton'));

        await button.click();

        let result = await driver.wait(until.elementLocated(By.css('.table > tbody > tr:nth-child(1) > td:nth-child(3)')), 5000);

        expect(await result.getText()).toBe('163');
    });

    afterAll(async () => {

        await driver.quit();
    });
});