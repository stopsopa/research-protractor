/**
 * http://www.protractortest.org/#/locators#finding-sub-elements
 */
describe('Protractor Demo App', function() {

    it('should have a history', function() {

        browser.angular(false);

        browser.get('/fixtures/cssContainingText.html' /* , timeout:int */);

        var parent = element(by.cssContainingText('li', 'Cat'));

        var child = parent.element(by.cssContainingText('.pet', 'Cat'));

        expect(child.getText()).toBe('- Cat is also here');
    });
});