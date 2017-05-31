'use strict';

/**
 * http://blog.ng-book.com/executing-raw-javascript-in-protractor/
 */
describe('Protractor Demo App', function() {
    it('should add one and two', function(done) {

        browser.ignoreSynchronization = true;
        browser.waitForAngularEnabled(false);

        browser.get('/fixtures/html.php' /* , timeout:int */);

        var script = `
return document.querySelector('div').innerHTML;        
`;

        browser.driver.executeScript(script.toString()).then(function (data) {

            console.log('version '.repeat(10), data);

            // console.log('key: ', protractor.Key);

            // http://www.protractortest.org/#/api-overview#global-variables
            expect(data).toEqual('lorem ipsum...');

            setTimeout(done, 1000);
        });
    });
});

