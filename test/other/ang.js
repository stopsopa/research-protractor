describe('Protractor Demo App', function() {
    it('should have a title', function(done) {

        browser.get('https://angularjs.org' /* , timeout:int */);

        setTimeout(function () {
            console.log('title: ', browser.getTitle())
            expect(browser.getTitle()).toContain('Superheroic');
            done();
        }, 3000);
    });
});