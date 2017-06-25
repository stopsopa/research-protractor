'use strict';

var extensions = require('./extensions.js');

/**
 * conf spec: https://github.com/angular/protractor/blob/5.1.2/lib/config.ts#L644
 */
var config = extensions({
    seleniumServerStartTimeout: 120000, // 1.5 min
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
        {
            browserName: "MicrosoftEdge",
            platform: "WIN10"
        },
        {
            browserName: "internet explorer",
            version: '11',
            platform: "WIN10"
        },
        {
            browserName: "chrome",
            platform: "WIN10"
        },
        {
            browserName: "firefox",
            platform: "WIN10"
        },
        {
            browserName: "chrome",
            platform: "macOS 10.12"
        },
        {
            browserName: "firefox",
            platform: "macOS 10.12"
        },
        {
            browserName: "safari",
            platform: "macOS 10.12"
        },
    ]
});

// process.stdout.write(JSON.stringify(config, null, '    '));
// process.exit(1);

exports.config = config;
