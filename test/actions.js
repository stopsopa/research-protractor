/**
 * http://www.protractortest.org/#/locators#actions
 * sudo /bin/bash prot.sh test --specs test/actions.js
 */
describe('Protractor Demo App', function() {

    it('should have a title', function(done) {

        // browser.ignoreSynchronization = true;
        browser.waitForAngularEnabled(false);

        browser.get('/fixtures/actions.html' /* , timeout:int */);

        var ename        = element(by.css('[name="naddme"]'));

        var el = element(by.tagName('input'));

        el.clear();

        el.sendKeys('config param: ' + config.parameters.host);

        // to control that execute command:
        // node node_modules/protractor/bin/protractor debug conf.js "--specs" "test/actions.js"
        // manually
        browser.pause();

        el.clear();

        el.sendKeys('and final val');

        expect(el.getAttribute('value').then(function (text) {
            console.log('****'.repeat(10), text)
            return text
        })).toBe('and final val');

        setTimeout(done, 5000);
    });

});