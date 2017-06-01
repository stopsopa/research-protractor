'use strict';

/**
 * http://www.protractortest.org/#/tutorial#step-1-interacting-with-elements
 */
describe('Protractor Demo App', function() {

    it('should add one and two', function() {

        browser.angular(false);

        browser.get('/fixtures/html.php' /* , timeout:int */);

        $('button').click();

        browser.wait(protractor.ExpectedConditions.textToBePresentInElement($('pre'), 'finally: '), 10000);

        expect($('pre').getText()).toContain('finally: ');
    });
});

