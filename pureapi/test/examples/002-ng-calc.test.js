
const path = require('path');

const { By, promise, until } = require('selenium-webdriver');

describe('ng-calc', async () => {

    let driver;

    beforeAll(async () => {

        driver = await require(path.resolve(__dirname, '..', '..', 'driver.js'));
    });

    it('calc', async () => {

        // https://stopsopa.github.io/research-protractor/e2e/angular-calc/calc.html
        // await driver.get('https://stopsopa.github.io/research-protractor/e2e/angular-calc/calc.html');
        await driver.getTestServer('/002-ng-calc/calc.html');

        // await promise.delayed(5000);

        let a = await driver.findElement(By.css('[ng-model="second"]'));
        // await promise.delayed(5000);

        let b = await driver.findElement(By.css('[ng-model="first"]'));
        // await promise.delayed(5000);

        await a.sendKeys("89");
        // await promise.delayed(5000);

        await b.sendKeys("74");

        // await promise.delayed(5000);

        // await promise.delayed(1000);

        // let button = await driver.findElement(By.id('gobutton'));
        //
        // await button.click();
        //
        // let result = await driver.wait(until.elementLocated(By.css('.table > tbody > tr:nth-child(1) > td:nth-child(3)')), 5000);
        //
        // await promise.delayed(1000);
        //
        // expect(await result.getText()).toBe('163');
    });

    afterAll(async () => {

        await driver.quit();
    });
});