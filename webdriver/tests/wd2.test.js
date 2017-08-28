'use strict';

var webdriver = require('selenium-webdriver');
const log = console.log;

describe('wd2', function () {

    beforeAll(function () {

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

        log('beforeAll');
    });

    afterAll(function () {
        log('afterAll')
    });

    it('inside 1', function () {

        var capabilities = {
            browserName: "chrome",
            platform: "macOS 10.12",
            flag: 'mc'
        };

        var driver = new webdriver.Builder()
            // .usingServer('http://localhost:4444/wd/hub')
                .usingServer('http://138.68.156.126:4444/wd/hub')
                .withCapabilities(capabilities)
                .build()
        ;

        return driver.get('https://stopsopa.github.io/research-protractor/e2e/nong.html')
            .then(() => {
                return driver.findElement(webdriver.By.css('#go')).click();
            })
            .then(() => {
                return driver.findElement(webdriver.By.css('div'));
            })
            .then((div) => {
                return div.getText();
            })
            .then((text) => {
                expect(text).toEqual('clicked');
            })
            .then(() => {
                log('quit...');
                driver.quit();
            })
        ;
    });

    it('inside 2', function () {

        var capabilities = {
            browserName: "firefox",
            platform: "macOS 10.12",
            flag: 'mc'
        };

        var driver = new webdriver.Builder()
            // .usingServer('http://localhost:4444/wd/hub')
                .usingServer('http://138.68.156.126:4444/wd/hub')
                .withCapabilities(capabilities)
                .build()
        ;

        return driver.get('https://stopsopa.github.io/research-protractor/e2e/nong.html')
            .then(() => {
                return driver.findElement(webdriver.By.css('#go')).click();
            })
            .then(() => {
                return driver.findElement(webdriver.By.css('div'));
            })
            .then((div) => {
                return div.getText();
            })
            .then((text) => {
                expect(text).toEqual('clicked');
            })
            .then(() => {
                log('quit...');
                driver.quit();
            })
        ;
    });

    it('inside 2', function () {

        var capabilities = {
            browserName: "internet explorer",
            platform: "WIN10",
            flag: 'mc'
        };

        var driver = new webdriver.Builder()
            // .usingServer('http://localhost:4444/wd/hub')
                .usingServer('http://138.68.156.126:4444/wd/hub')
                .withCapabilities(capabilities)
                .build()
        ;

        return driver.get('https://stopsopa.github.io/research-protractor/e2e/nong.html')
            .then(() => {
                return driver.findElement(webdriver.By.css('#go')).click();
            })
            .then(() => {
                return driver.findElement(webdriver.By.css('div'));
            })
            .then((div) => {
                return div.getText();
            })
            .then((text) => {
                expect(text).toEqual('clicked');
            })
            .then(() => {
                log('quit...');
                driver.quit();
            })
            ;
    });
});