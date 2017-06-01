describe('Protractor Demo App', function() {
    it('should have a title', function() {

        browser.angular(true);

        browser.get('http://juliemr.github.io/protractor-demo/' /* , timeout:int */);

        expect(browser.getTitle()).toEqual('Super Calculator');
    });
});