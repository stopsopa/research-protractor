

// from : http://seleniumhq.github.io/selenium/docs/api/javascript/
// and above is from: https://github.com/SeleniumHQ/selenium

// explore code :
// https://github.com/SeleniumHQ/selenium/tree/master/javascript/node/selenium-webdriver
// auto generated doc:
// http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index.html

const path = require('path');

const log = require(path.resolve(__dirname, '.', 'lib', 'logn'));


// console.log(typeof require('selenium-webdriver'));
// process.exit(0);

// require(path.resolve(__dirname, '..', 'lib', 'rootrequire'))(__dirname, '..');

const {Builder, By, Key, until, promise, Browser} = require('selenium-webdriver');
const chrome    = require('selenium-webdriver/chrome');
const Options   = chrome.Options;
// const edge      = require('selenium-webdriver/edge');
// const firefox   = require('selenium-webdriver/firefox');

// const wait = (sec = 1) => new Promise(r => {const ms = parseInt(sec * 1000); setTimeout(r, ms, 'resolved: wait ' + sec + ' sec')});

const config = require(path.resolve('.', 'config'));

module.exports = (async function () {

    let driver;

    try {
        driver = await new Builder()
            .usingServer(`http://${config.node.host}:${config.node.port}/wd/hub`) //  to check go to : http://localhost:4444/grid/console?config=true&configDebug=true&refresh=10
            .forBrowser(Browser.CHROME)
            .setChromeOptions(
                new chrome
                    .Options()
                // .headless()
                    .windowSize({
                        width: config.width,
                        height: config.height
                    })

                // available devices, source code of chromium project
                // current version: https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/devtools/front_end/emulated_devices/module.json
                // older version: https://chromium.googlesource.com/chromium/src/+/ba858f4acbb01a224f03c5c19b392b94aae0ef91/third_party/WebKit/Source/devtools/front_end/toolbox/OverridesUI.js
                // new Options().setMobileEmulation({deviceName: "iPhone 6"}) // from 4 up to 6
            )
            // .setFirefoxOptions(
            //     new firefox
            //         .Options()
            //     //.headless()
            //         .windowSize({config.width, config.height})
            // )
            .setChromeService(
                new chrome.ServiceBuilder()
                    .enableVerboseLogging()
                    .setStdio('inherit'))
            // .setEdgeService(
            //     process.platform === 'win32'
            //         ? new edge.ServiceBuilder()
            //             .enableVerboseLogging()
            //             .setStdio('inherit')
            //         : null)
            // .setFirefoxService(
            //     new firefox.ServiceBuilder()
            //         .enableVerboseLogging()
            //         .setStdio('inherit'))
            .build()
        ;

        // // await driver.get('http://www.google.com/ncr');
        // //
        // // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        // //
        // // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        // //
        // // await promise.delayed(2000);
        // // const sec = await wait(10).catch(e => log('err', e));
        //
        // await driver.get('https://stopsopa.github.io/research-protractor/e2e/ng.html');
        //
        //
        // let button = await driver.findElement(By.id('go'));
        //
        // let div = await driver.findElement(By.css('div'));
        //
        // // await driver.actions({bridge: true}).click(button).perform(); // more complicated way
        //
        // await button.click();
        //
        // const html = await div.getText();
        //
        // await promise.delayed(2000);
        //
        // console.log('test 1', html === 'clicked' ? 'true' : 'false')


    } catch (e) {
        log.dump('e', e, e.message)
    }
    finally {

        // await driver.quit();
    }

    driver.config = config;

    driver.getTestServer = (path, ...rest) => {

        if (/^https?:\/\//.test(path)) {

            return old(path, ...rest);
        }

        let url = `http://${config.testServer.host}`;

        if (config.testServer.port != 80) {

            url += ':' + config.testServer.port;
        }

        url += path;

        console.log('getTestServer: ', url);

        return driver.get(url, ...rest);
    }

    return driver;
})();

