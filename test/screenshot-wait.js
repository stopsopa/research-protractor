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

describe('screenshot', function () {
    it('screenshot test', function (done) {

        browser.ignoreSynchronization = true;

        browser.waitForAngularEnabled(false);

        browser.get('/fixtures/html.php' /* , timeout:int */);

        element(by.css('button')).click();

        var pre = $('pre');

        screenshot('exception_early.png');

        // https://stackoverflow.com/questions/22072327/how-can-i-wait-for-a-condition
        // https://github.com/angular/protractor/blob/master/lib/expectedConditions.ts
        browser.wait(protractor.ExpectedConditions.presenceOf(element(by.id('done'))), 10000);

        screenshot('exception_late.png');

        done();
    });
});