// spec.js
describe('Protractor Demo App', function() {
    it('should have a title', function(done) {
        browser.get('http://juliemr.github.io/protractor-demo/');

        setTimeout(function () {
            expect(browser.getTitle()).toEqual('Super Calculator');
            done();
        }, 3000);
    });
});