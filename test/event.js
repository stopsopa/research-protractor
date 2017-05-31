'use strict';

function test() {
    return (window.protractor && window.protractor.eventkey) ? window.protractor.eventkey : null;
}

/**
 * http://blog.ng-book.com/executing-raw-javascript-in-protractor/
 */
describe('Protractor Demo App', function() {
    it('should add one and two', function(done) {

        browser.ignoreSynchronization = true;

        browser.waitForAngularEnabled(false);

        browser.get('/fixtures/event.php' /* , timeout:int */);

        element(by.css('button')).click();

        browser.wait(protractor.ExpectedConditions.textToBePresentInElement($('pre'), 'finally: '), 10000);

        browser.executeScript(test).then(function (data) {

            data.test = 'it is object indeed';

            console.log('data '.repeat(10), JSON.stringify(data));

            // http://www.protractortest.org/#/api-overview#global-variables
            expect(data).toEqual('lorem ipsum...');

            setTimeout(done, 1000);
        });
    });
});

