'use strict';

const sync = require('child_process').spawnSync;

let config = sync('php', ['../params/config.php']);

config = config.stdout.toString();

config = JSON.parse(config);

module.exports = function () {
    return {
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
         *    return (window.protractor && window.protractor['eventname']) ? window.protractor['eventname'] : null;
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

            /**
             * In test you can wait for js data like:
             *      browser.waitJs('eventkey' [, 10000]).then(function (data) { ... });
             */
            browser.waitJs = function (fn, timeout) {
                browser.wait(protractor.ExpectedConditions.jsCheck(fn), timeout);
                return browser.executeScript(fn);
            };

            (function () {

                function createFunction(name, del) {

                    del = (typeof del === 'undefined') ? false : true;

                    var fn = `
if (window.protractor && window.protractor[name]) {
    var ret = window.protractor[name];
    delete window.protractor[name];
    return ret;
}
return false;
`;
                    if (!del) {
                        fn = fn.replace('delete window.protractor[name];', '');
                    }

                    fn = fn.replace(/[\r\n]/g, '').replace(/[\r\n\s]{2,}/g, ' ').replace(/\[name\]/g, "['" + name + "']");
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
                 * in browser when you call:
                 *      window.protractor || (window.protractor = {}); window.protractor['eventkey'] = {data: 'something happened'};
                 *
                 * and then in test you can listen for event like:
                 *      browser.waitEvent('eventkey' [, 10000]).then(function (data) { ... });
                 */
                browser.waitEvent = function (name, timeout) {
                    browser.wait(protractor.ExpectedConditions.jsCheck(createFunction(name)), timeout);
                    return browser.executeScript(createFunction(name, true));
                };
            }())

        }
    }
};