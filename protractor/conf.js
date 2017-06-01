'use strict';

var extensions = require('./extensions.js');

/**
 * conf spec: https://github.com/angular/protractor/blob/5.1.2/lib/config.ts#L644
 */
exports.config = Object.assign(extensions(), {
    seleniumAddress: 'http://ondemand.saucelabs.com:80/wd/hub',
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        '../test/**/*.spec.js'
    ],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
    },

    // http://www.protractortest.org/#/control-flow#disabling-the-control-flow
    SELENIUM_PROMISE_MANAGER: true,

    multiCapabilities: [
        { // http://www.protractortest.org/#/tutorial#step-3-changing-the-configuration
            browserName: 'firefox'
        },
        // {
        //     browserName: 'chrome'
        // }
    ]
});