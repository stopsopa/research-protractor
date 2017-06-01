'use strict';

function test() {
    return document.querySelector('div').innerHTML;
}

/**
 * http://blog.ng-book.com/executing-raw-javascript-in-protractor/
 */
describe('Protractor Demo App', function() {

    it('should add one and two', function() {

        browser.angular(false);

        browser.get('/fixtures/html.php' /* , timeout:int */);

        browser.executeScript(test).then(function (data) {

            expect(data).toEqual('lorem ipsum...');
        });
    });
});

