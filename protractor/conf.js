'use strict';

var extensions = require('./extensions.js');

/**
 * conf spec: https://github.com/angular/protractor/blob/5.1.2/lib/config.ts#L644
 */
var config = Object.assign(extensions(), {
    specs: [
        '../tests/e2e/**/*.spec.js' // for sauce labs test only local
    ],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
    },

    // http://www.protractortest.org/#/control-flow#disabling-the-control-flow
    SELENIUM_PROMISE_MANAGER: true,

    multiCapabilities: [
        // {
        //     browserName: "MicrosoftEdge",
        //     platform: "WINDOWS"
        // },
        // {
        //     browserName: "internet explorer",
        //     version: '11',
        //     platform: "WINDOWS"
        // },
        // {
        //     browserName: "chrome",
        //     platform: "WINDOWS"
        // },
        // {
        //     browserName: "firefox",
        //     platform: "WINDOWS"
        // },
        {
            browserName: "chrome",
            platform: "MAC",
            chromeOptions: {
                args: ['--window-size=768,768'] // THIS!
            }
        },
        // {
        //     browserName: "firefox",
        //     platform: "MAC"
        // },
        {
            browserName: "safari",
            platform: "MAC"
        },
    ]
});

// process.stdout.write(JSON.stringify(config, null, '    '));
// process.exit(1);

exports.config = config;
