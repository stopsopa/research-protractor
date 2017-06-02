'use strict';

// at the top of the test spec:
var fs = require('fs');

function screenshot(file) {
    browser.takeScreenshot().then(function (png) {
        var stream = fs.createWriteStream(file);
        stream.write(new Buffer(png, 'base64'));
        stream.end();
    });
}

describe('testing news page', function () {
    it('screenshot test', function () {

        browser.angular(false);

        browser.get('/fixtures/html.php' /* , timeout:int */);

        element(by.css('button')).click();

        var pre = $('pre');

        screenshot('../tmp/exception_early.png');

        browser.wait(protractor.ExpectedConditions.presenceOf(element(by.id('done'))), 10000);

        browser.wait(protractor.ExpectedConditions.textToBePresentInElement($('pre'), 'finally: '), 10000);

        screenshot('../tmp/exception_late.png');
    });
});