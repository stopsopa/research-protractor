'use strict';

function test() {
    window.protract.fjjdskjsa;
}

/**
 * http://blog.ng-book.com/executing-raw-javascript-in-protractor/
 */
describe('Protractor Demo App', function() {
    it('should add one and two', function() {

        browser.angular(false);

        browser.get('/fixtures/event.php' /* , timeout:int */);

        element(by.css('button')).click();

        browser.waitEvent('eventkey', 5000).then(function (data) {

            data.test = 'it is object indeed';

            expect(JSON.stringify(data)).toEqual('{"data":"something happened","test":"it is object indeed"}');
        });
    });
});

