/**
 * http://www.protractortest.org/#/api?view=ProtractorBy.prototype.cssContainingText
 */
describe('Protractor Demo App', function() {

    it('should have a title', function() {

        browser.angular(false);

        browser.get('/fixtures/cssContainingText.html' /* , timeout:int */);

        // is CASE SENSITIVE
        var dog = element(by.cssContainingText('.pet', 'Dog'));

        expect(dog.getText()).toBe('the Dog is barking');
    });

});