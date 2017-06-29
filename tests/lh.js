/**
 * http://www.protractortest.org/#/tutorial#step-2-writing-multiple-scenarios
 */
describe('Protractor Demo App', function() {

    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
    });

    it('no angular', function () {

        browser.angular(false);

        browser.get('http://www.lymphomahub.com/');

        browser.find('.featured-article h1', 4000);

        var h1 = $$('.featured-article h1').first();

        h1.getText().then(function (t) {

            h1.click();

            browser.find('h1', 4000);

            browser.waitJs(function () {
                return document.querySelector('h1').innerText;
            }, 4000).then(function (tt) {

                var tmp = t.substring(0, t.length - 10);

                expect(tt.indexOf(tmp) > -1).toBe(true);
            });

            browser.sleep(6000);
        });
    });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});