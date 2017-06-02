'use strict';

var extensions = require('./extensions.js');

/**
 * conf spec: https://github.com/angular/protractor/blob/5.1.2/lib/config.ts#L644
 */
var config = Object.assign(extensions(), {
    // seleniumAddress: 'http://ondemand.saucelabs.com:80/wd/hub',

    // don't do that because user and key will be visible in travis
    // seleniumAddress: "http://" + process.env.SAUCE_USERNAME + ":" + process.env.SAUCE_ACCESS_KEY + "@ondemand.saucelabs.com:80/wd/hub",

    // seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        // '../test/**/*.spec.js'
        '../test/*.spec.js' // for sauce labs test only local
    ],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
    },

    // http://www.protractortest.org/#/control-flow#disabling-the-control-flow
    SELENIUM_PROMISE_MANAGER: true,

    multiCapabilities: [
        // { // http://www.protractortest.org/#/tutorial#step-3-changing-the-configuration
        //     browserName: 'firefox'
        // },
        {
            browserName: 'chrome'
        }
    ]
});

if (process.env.TRAVIS) {

    delete config.multiCapabilities;

    config.sauceUser = process.env.SAUCE_USERNAME;
    config.sauceKey = process.env.SAUCE_ACCESS_KEY;
    config.capabilities = {
        'browserName': 'chrome',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER
    };
}

exports.config = config;
