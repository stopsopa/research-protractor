/**
 * http://www.protractortest.org/#/locators#actions
 * sudo /bin/bash prot.sh test --specs test/actions.js
 */
describe('Protractor Demo App', function() {

    it('should have a title', function() {

        browser.angular(false);

        browser.get('/fixtures/actions.html' /* , timeout:int */);

        var el = element(by.tagName('input'));

        el.clear();

        el.sendKeys('config param: ' + config.parameters.host);

        // to control that execute command:
        // node node_modules/protractor/bin/protractor debug conf.js "--specs" "test/actions.js"
        // manually
        // browser.pause();

        el.clear();

        el.sendKeys('and final val');

        expect(el.getAttribute('value')).toBe('and final val');
    });

});