/**
 * http://www.protractortest.org/#/tutorial#step-2-writing-multiple-scenarios
 */
describe('Protractor Demo App', function() {

    it('no angular', function () {

        browser.angular(false);

        browser.get('https://stopsopa.github.io/research-protractor/e2e/nong.html');

        browser.find('#go');

        $('#go').click();

        expect($('div').getText().then((a) => a.trim())).toEqual("clicked");
    });
});