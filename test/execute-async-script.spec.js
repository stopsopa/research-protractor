'use strict';

function test() {
    var callback = arguments[arguments.length - 1];

    setTimeout(function () {
        callback(document.querySelector('div').innerHTML);
    }, 1000);
}

/**
 * http://blog.ng-book.com/executing-raw-javascript-in-protractor/
 */
describe('Protractor Demo App', function() {

    it('should add one and two', function() {

        browser.angular(false);

        browser.get('/fixtures/html.php' /* , timeout:int */);

        browser.executeAsyncScript(test).then(function (data) {

            expect(data).toEqual('lorem ipsum...');
        });
    });
});

