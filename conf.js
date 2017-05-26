'use strict';

const sync = require('child_process').spawnSync;

let config = sync('php', ['params/config.php']);

config = config.stdout.toString();

config = JSON.parse(config);

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'test/*.js'
    ],
    multiCapabilities: [{ // http://www.protractortest.org/#/tutorial#step-3-changing-the-configuration
        browserName: 'firefox'
    }, {
        browserName: 'chrome'
    }],
    onPrepare: function() {
        browser.config = config;

        // and from now on use in tests 'browser.config.param1' to get access to params from config object above
    }
};