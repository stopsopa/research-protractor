/**
 * http://www.protractortest.org/#/tutorial#step-2-writing-multiple-scenarios
 */
describe('Protractor Demo App', function() {

    it('no angular', function () {

        browser.angular(false);

        browser.get('https://stopsopa.github.io/research-protractor/e2e/ng.html');

        browser.find('#go');

        browser.sleep(1000);

        $('#go').click();

        browser.sleep(1000);

        expect($('div').getText().then((a) => a.trim())).toEqual("clicked");
    });
});