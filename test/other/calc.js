describe('Protractor Demo App', function() {
    it('should have a title', function(done) {
        browser.get('http://juliemr.github.io/protractor-demo/' /* , timeout:int */);

        setTimeout(function () {
            expect(browser.getTitle()).toEqual('Super Calculator');
            done();
        }, 3000);
    });
});