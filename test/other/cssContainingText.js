/**
 * http://www.protractortest.org/#/api?view=ProtractorBy.prototype.cssContainingText
 */
describe('Protractor Demo App', function() {

    it('should have a title', function(done) {

        browser.ignoreSynchronization = true;
        browser.waitForAngularEnabled(false);

        browser.get('/fixtures/cssContainingText.html' /* , timeout:int */);

        // is CASE SENSITIVE
        var dog = element(by.cssContainingText('.pet', 'Dog'));

        expect(dog.getText()).toBe('the Dog is barking');

        setTimeout(done, 4000);
    });

});