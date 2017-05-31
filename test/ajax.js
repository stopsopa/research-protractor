'use strict';

/**
 * http://www.protractortest.org/#/tutorial#step-1-interacting-with-elements
 */
describe('Protractor Demo App', function() {
    it('should add one and two', function(done) {
        // https://github.com/sakshisingla/Protractor-Non-Angular-Tests/wiki/Creating-test-scripts-using-Protractor-for-non-angular-application
        // locators: http://www.protractortest.org/#/locators
        // http://www.protractortest.org/#/tutorial

        browser.ignoreSynchronization = true;
        browser.waitForAngularEnabled(false);

        browser.get('/fixtures/html.php' /* , timeout:int */);

        // browser.findElement(by.id('bid')).click(); // works
        // browser.findElement(by.tagName('button')).click(); // works

        browser.findElement(by.css('button')).click(); // works

        browser.wait(waitForCounterIncrease('finally'));

        // This is the custom funtion.
        // Note: If condition is not met, this function will timeout based on the settings.
        function waitForCounterIncrease(val) {
            return function () {
                return new Promise(function (resolve, reject) {
                    element(by.css('pre')).getText().then(function (counterVal) {
                        console.log('val '.repeat(100) + counterVal)
                        if (counterVal.indexOf(val) > -1) {
                            resolve(counterVal);
                        }
                    });
                });
            }
        }

        browser.findElement(by.css('pre')).getText().then(function (val) {
            console.log('text '.repeat(100), val);
            done();
        });


        // browser.pause();

        // browser.driver.wait(function() {
        //     return browser.driver.findElement(by.id('bid'))
        //         .then(function(elem) {
        //             elem.click();
        //             return true;
        //         });
        // }, 300);

        // setTimeout(function () {
        //     $('button').click();
        // }, 1000);



        // by.binding('latest') to find the element bound to the variable latest. This finds the span containing {{latest}}
        // expect(element(by.binding('latest')).getText()).toEqual('3');

        // setTimeout(function () {
        //
        //     console.log('-'.repeat(1000))
        //     console.log('text', browser.findElement(by.css('pre')).getText());
        //
        //     browser.findElement(by.css('pre')).getText().then(function (data) {
        //         console.log('data', data)
        //     });
        //
        //     // expect(.toString()).toContain('finally:');
        //     setTimeout(function () {
        //         console.log('text', browser.findElement(by.css('pre')).getText());
        //         done();
        //     }, 3000);
        //     console.log('+'.repeat(1000))
        //
        // }, 8000);
    });
});

