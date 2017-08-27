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


    // https://github.com/SeleniumHQ/selenium/blob/master/java/server/src/org/openqa/grid/common/defaults/DefaultNodeWebDriver.json
    multiCapabilities: [
        {
            browserName: "MicrosoftEdge",
            platform: "WIN10",
            flag: 'we'
        },
        {
            browserName: "internet explorer",
            version: '11',
            platform: "WIN10",
            flag: 'wi'
        },
        {
            browserName: "chrome",
            platform: "WIN10",
            flag: 'wc'
        },
        {
            browserName: "firefox",
            platform: "WIN10",
            flag: 'wf'
        },
        {
            browserName: "chrome",
            platform: "macOS 10.12",
            flag: 'mc'
        },
        {
            browserName: "firefox",
            platform: "macOS 10.12",
            flag: 'mf'
        },
        {
            browserName: "safari",
            platform: "macOS 10.12",
            flag: 'ms'
        },
    ]
});

// process.stdout.write(JSON.stringify(config, null, '    '));
// process.exit(1);

exports.config = config;
