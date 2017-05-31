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

        /**
         * use example
         * function test() {
         *    // return something "truthy"
         *    return (window.protractor && window.protractor.eventkey) ? window.protractor.eventkey : null;
         * }
         * browser.wait(protractor.ExpectedConditions.jsCheck(test), 10000);
         */
        protractor.ExpectedConditions.jsCheck = function (script) {
            return this.and(() => {
                return browser.executeScript(script).then((data) => {
                    return !!data;
                })
            });
        };

        (function () {

            function createFunction(name) {
                var fn = 'return (window.protractor && window.protractor[name]) ? window.protractor[name] : null;';
                fn = fn.replace(/\[name\]/g, "['" + name + "']");
                return Function(fn);
            }
            /**
             * in browser when you call:
             *      window.protractor || (window.protractor = {}); window.protractor['eventkey'] = {data: 'something happened'};
             *
             * and then in test you can wait until this event will be triggered like:
             *      browser.wait(protractor.ExpectedConditions.event('eventkey') [, timeout]);
             */
            protractor.ExpectedConditions.event = function (name) {
                return protractor.ExpectedConditions.jsCheck(createFunction(name));
            }

            /**
             * In test you can wait for js data like:
             *      browser.waitJs('eventkey' [, 10000]).then(function (data) { ... });
             */
            browser.waitJs = function (fn, timeout) {
                browser.wait(protractor.ExpectedConditions.jsCheck(fn), timeout);
                return browser.executeScript(fn);
            };

            /**
             * in browser when you call:
             *      window.protractor || (window.protractor = {}); window.protractor['eventkey'] = {data: 'something happened'};
             *
             * and then in test you can listen for event like:
             *      browser.waitEvent('eventkey' [, 10000]).then(function (data) { ... });
             */
            browser.waitEvent = function (name, timeout) {
                return browser.waitJs(createFunction(name), timeout);
            };
        }())

    }
};