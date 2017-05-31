'use strict';

const sync = require('child_process').spawnSync;

let config = sync('php', ['params/config.php']);

config = config.stdout.toString();

config = JSON.parse(config);

/**
 * conf spec: https://github.com/angular/protractor/blob/5.1.2/lib/config.ts#L644
 */
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'test/*.js'
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
    ],
    baseUrl: config.parameters.protocol + '://' + config.parameters.host,
    onPrepare: function() {
        global.config = config;
        // and from now on use in tests 'browser.config.param1' to get access to params from config object above

        // you can also login user here

        // RETURN PROMISE: http://www.protractortest.org/#/system-setup
        //     https://github.com/angular/protractor/blob/master/spec/withLoginConf.js

        // good idea probably would be to get user and password under browser.user and browser.pass
    }
};