'use strict';

/**
 * http://www.protractortest.org/#/tutorial#step-1-interacting-with-elements
 */
describe('Protractor Demo App', function() {
    it('should add one and two', function(done) {

        browser.get('http://juliemr.github.io/protractor-demo/' /* , timeout:int */);

        element(by.css('[ng-model="first"]')).sendKeys(1);
        element(by.css('[ng-model="second"]')).sendKeys(2);

        element(by.css('#gobutton')).click();

        // by.binding('latest') to find the element bound to the variable latest. This finds the span containing {{latest}}
        expect(element(by.binding('latest')).getText()).toEqual('3');

        setTimeout(done, 8000);
    });
});

