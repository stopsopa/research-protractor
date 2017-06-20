'use strict';

const log = console.log;

function json (arr) {
    var i = 0, tmp = '[';
    arr.forEach(function (d) {
        tmp += (i ? ',' : '') + "\n    " + JSON.stringify(d);
        i += 1;
    });
    return tmp + "\n]";
}

var cache = (function () {

    const path = require('path');

    const fs = require('fs');

    let cache = false, ccache = false;

    let file, cfile;

    var dir = path.resolve(__dirname, 'sessions');

    if (!fs.existsSync(dir)) {

        fs.mkdirSync(dir);
    }

    if (!fs.existsSync(dir)) {

        console.log("Can't create directory: " + dir)
        process.exit(1);
    }

    if (process.env.PROT_SESSION) {

        file    = path.resolve(dir, process.env.PROT_SESSION + '.json');

        cfile   = path.resolve(dir, process.env.PROT_SESSION + '_config' + '.json');
    }

    var tool = function (config) {

        if (!process.env.PROT_SESSION) {
            return false;
        }

        if (config) {

            if (ccache) {
                return ccache;
            }

            if (fs.existsSync(cfile)) {

                return ccache = JSON.parse(fs.readFileSync(cfile));
            }
        }
        else {
            if (cache) {
                return cache;
            }

            if (fs.existsSync(file)) {

                return cache = JSON.parse(fs.readFileSync(file));
            }
        }

        return false;
    }

    tool.save = function (data, config) {

        config = config ? cfile : file ;

        if (!process.env.PROT_SESSION) {

            return tool;
        }

        fs.writeFileSync(config, JSON.stringify(data, null, '    '));

        return tool;
    }

    return tool;
}());

const config = (function () {

    var tmp = cache(true);

    if (tmp) {
        return tmp;
    }

    const sync = require('child_process').spawnSync;

    const cmd = Array.prototype.slice.call(arguments, 0);

    function testEndpoint(url) {

        const sel = sync('curl', [url, '-i']);

        return ! (
            sel.stdout.toString().indexOf('WebDriver Hub') === -1 && // single node endpoint
            sel.stdout.toString().indexOf('java.lang.NullPointerException') === -1    // hub endpoint
        );
    }

    let config = sync.apply(this, cmd);

    config = config.stdout.toString();

    try {
        config = JSON.parse(config);
    }
    catch (e) {
        process.stdout.write("Config parse json error, check command: \n" + cmd[0] + ' ' + cmd[1].join(' ') + "\n");
        process.exit(1);
    }

    if (!config.parameters.selenium_address) {
        process.stdout.write("\nthere is no 'selenium_address' parameter in config fetched by command " + JSON.stringify(cmd) + "\n");
        process.exit(1);
    }

    if ( testEndpoint(config.parameters.selenium_address_local) ) {
        config.parameters.selenium_address = config.parameters.selenium_address_local
    }
    else {
        if ( ! testEndpoint(config.parameters.selenium_address) ) {
            process.stdout.write(
                "Wrong curl response from endpoint : " +
                config.parameters.selenium_address +
                "\n\nstdout:\n" + sel.stdout.toString() +
                "\n\nstderr:\n" + sel.stderr.toString() +
                "\n\n"
            );
            process.exit(1);
        }
    }

    var fs = require('fs');
    var path = 'node_modules/webdriver-manager/selenium';
    if (!fs.existsSync(path)) {
        process.stdout.write(
            "\nif you wan't to run local selenium server run\n" +
            "\nnode node_modules/protractor/bin/webdriver-manager update\n" +
            `because file '${path}' is missing` +
            "\n\n"
        );        // Do something
    }

    cache.save(config, true);

    return config;
// }('php', ['../bin/console', 'params']));
}('php', ['config.php']));

var exclude = (function () {

    var log = console.log;

    return function (declared) {

        let endpoint = config.parameters.selenium_address;

        endpoint = endpoint.replace(/^(https?:\/\/[^\/]*).*$/, '$1');

        const sync          = require('child_process').spawnSync;

        const nodes = sync('curl', [endpoint + '/grid/console', '-L', '--max-time', '1']);

        var html = nodes.output.toString();

        var available = [];

        html.replace(/remoteHost: (https?:\/\/[^<]+)</g, function (e, url) {
            available.push(url);
        });

        available = available.map(function (url) {

            let res = sync('curl', [[endpoint, '/grid/api/proxy?id=', url].join(''), '-L', '-s', '--max-time', '1']);

            res = res.output.toString();

            res = res.replace(/^[,\s]+(.*?)[,\s]*$/, '$1');

            res = JSON.parse(res);

            return res.request.configuration.capabilities;
        })

        available = Array.prototype.concat.apply([], available);

        available = JSON.parse(JSON.stringify(available).toLowerCase());

        var declaredcp = JSON.parse(JSON.stringify(declared).toLowerCase());

        log(':protractor: declared:', json(declared));

        log(':protractor: available:', json(available));

        var list = [];

        for (var i = 0, l = declaredcp.length ; i < l ; i += 1 ) {
            for (var ii = 0, ll = available.length ; ii < ll ; ii += 1 ) {
                if (declaredcp[i].browsername === available[ii].browsername && declaredcp[i].platform === available[ii].platform) {
                    list.push(declared[i])
                    break;
                }
            }
        }

        var notfound = JSON.parse(JSON.stringify(declaredcp));
        var listcp = JSON.parse(JSON.stringify(list).toLowerCase());

        for (var i = 0, l = listcp.length ; i < l ; i += 1 ) {
            for (var ii = 0, ll = notfound.length ; ii < ll ; ii += 1 ) {
                if (listcp[i].browsername === notfound[ii].browsername && listcp[i].platform === notfound[ii].platform) {
                    notfound.splice(ii, 1);
                    break;
                }
            }
        }

        log(':protractor: final:', json(list));

        if (!list.length) {
            log("Not found even one matching browser");
            process.exit(1);
        }

        if (notfound.length) {
            log('-'.repeat(40) + "\n");
            log(':protractor: not found:', json(notfound));
            log('-'.repeat(40) + "\n");
        }

        log = function () {};

        return list;
    }
}());

module.exports = function (raw) {

    var data = cache();

    function onPrepare() {

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
         * browser.wait(protractor.ExpectedConditions.js(test), 10000);
         */
        protractor.ExpectedConditions.js = function (script) {
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
            browser.wait(protractor.ExpectedConditions.js(fn), timeout);
            return browser.executeScript(fn);
        };

        (function () {

            function createFunction(name, del) {

                del = (typeof del === 'undefined') ? false : true;

                del = del ? 'delete window.protractor[name];' : '';

                var fn = `
if (window.protractor && window.protractor[name]) {
    var ret = window.protractor[name];
    ${del}
    return ret;
}
return false;
`;
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
                return protractor.ExpectedConditions.js(createFunction(name));
            }

            /**
             * in browser when you call:
             *      window.protractor || (window.protractor = {}); window.protractor['eventkey'] = {data: 'something happened'};
             *
             * and then in test you can listen for event like:
             *      browser.waitEvent('eventkey' [, 10000]).then(function (data) { ... });
             */
            browser.waitEvent = function (name, timeout) {
                browser.wait(protractor.ExpectedConditions.js(createFunction(name)), timeout);
                return browser.executeScript(createFunction(name, true));
            };
        }());

        /**
         * call only browser.angular(false)
         * calling browser.angular(true) is default
         */
        browser.angular = function (mode, timeout) {

            if (typeof mode === 'undefined') {
                throw "browser.angular(mode) - mode not specified";
            }

            mode = !!mode;

            /**
             * don't wait for angular $timeout
             */
            // browser.ignoreSynchronization = !mode;
            //
            // browser.waitForAngularEnabled(mode);



            /**
             * don't wait for angular $timeout
             */
            browser.ignoreSynchronization = !mode;

            browser.waitForAngularEnabled(mode);

            // if (mode === false) {
            //
            //     var fn = `document.addEventListener('DOMContentLoaded', arguments[arguments.length - 1]);`;
            //
            //     browser.executeAsyncScript(fn);
            // }
        };

        /**
         * Tool to search elements on page
         */
        browser.find = function (selector, sleep) {

            var fn = `document.querySelector('${selector}').style.border = '4px solid red'`;

            fn = Function(fn);

            browser.executeScript(fn);

            browser.sleep(sleep || 2000);
        }
    }

    if (data) {

        data.onPrepare = onPrepare;

        return data;
    }

    data = Object.assign(raw, {
        multiCapabilities: exclude(raw.multiCapabilities),
        seleniumAddress: config.parameters.selenium_address,
        baseUrl: config.parameters.protocol + '://' + config.parameters.host + ((config.parameters.port == 80) ? '' : ':' + config.parameters.port),
    });

    cache.save(data);

    data.onPrepare = onPrepare;

    return data;
};