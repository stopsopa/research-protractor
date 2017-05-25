

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'test/*.js'
    ],
    multiCapabilities: [{ // http://www.protractortest.org/#/tutorial#step-3-changing-the-configuration
        browserName: 'firefox'
    }, {
        browserName: 'chrome'
    }]
};