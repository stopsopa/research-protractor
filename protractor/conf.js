'use strict';

var extensions = require('./extensions.js');

/**
 * conf spec: https://github.com/angular/protractor/blob/5.1.2/lib/config.ts#L644
 */
var config = Object.assign(extensions(), {
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
        {
            browserName: "MicrosoftEdge",
            platform: "WINDOWS"
        },
        // {
        //     browserName: "internet explorer",
        //     version: 11,
        //     platform: "WINDOWS"
        // },
        {
            browserName: "chrome",
            platform: "WINDOWS"
        },
        {
            browserName: "firefox",
            platform: "WINDOWS"
        },
        {
            browserName: "chrome",
            platform: "MAC"
        },
        {
            browserName: "firefox",
            platform: "MAC"
        },
        {
            browserName: "safari",
            platform: "MAC"
        },
    ]
});

if (process.env.TRAVIS) {

    delete config.multiCapabilities;

    config.sauceUser = process.env.SAUCE_USERNAME;
    config.sauceKey = process.env.SAUCE_ACCESS_KEY;
    config.multiCapabilities = [ // https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
        {
            browserName: 'firefox',
            platform: 'macOS 10.12',
            version: '53.0'
        },
        {
            browserName: 'chrome',
            platform: 'Windows 10',
            version: '58.0',
        }
    ];

    for (var i in config.multiCapabilities) {
        config.multiCapabilities[i]['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;
        config.multiCapabilities[i]['build'] = process.env.TRAVIS_BUILD_NUMBER;
    }
}

// process.stdout.write(JSON.stringify(config, null, '    '));
// process.exit(1);

exports.config = config;
