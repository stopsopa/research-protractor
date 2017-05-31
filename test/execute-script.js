'use strict';

function test() {
    return document.querySelector('div').innerHTML;
}

/**
 * http://blog.ng-book.com/executing-raw-javascript-in-protractor/
 */
describe('Protractor Demo App', function() {

    it('should add one and two', function(done) {

        browser.ignoreSynchronization = true;

        browser.waitForAngularEnabled(false);

        browser.get('/fixtures/html.php' /* , timeout:int */);

        browser.executeScript(test).then(function (data) {

            console.log('data '.repeat(10), JSON.stringify(data));

            // console.log('key: ', protractor.Key);

            // http://www.protractortest.org/#/api-overview#global-variables
            expect(data).toEqual('lorem ipsum...');

            setTimeout(done, 1000);
        });
    });
});

