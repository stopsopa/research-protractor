'use strict';

const log = console.log;

var webdriver = require('selenium-webdriver');

// Input capabilities
var capabilities = {
    browserName: "chrome",
    platform: "macOS 10.12",
    flag: 'mc'
};

// browserName=MicrosoftEdge, maxInstances=10, platform=WIN10}]
// browserName=chrome, maxInstances=10, platform=WIN10}]
// browserName=firefox, maxInstances=10, platform=WIN10}]
// browserName=internet explorer, maxInstances=10, version=11, platform=WIN10}]

var driver = new webdriver.Builder()
    .usingServer('http://localhost:4444/wd/hub')
    // .usingServer('http://138.68.156.126:4444/wd/hub')
    .withCapabilities(capabilities)
    .build()
;

process.on('uncaughtException', function (err) {
    log('process exception' + "\n\n\n\n\n");
    console.error(err.stack);
    console.log("Node NOT Exiting...");
    driver.quit();
});

try {

    driver.get('https://stopsopa.github.io/research-protractor/e2e/nong.html')
        .then(() => {
            log('loaded...');
            return driver.findElement(webdriver.By.css('#go')).click();
        })
        .then(() => {
            return driver.findElement(webdriver.By.css('div'));
        })
        .then((element) => {
            log('div found');
            return element.getTexty();
        })
        .then((text) => {
            log('text', text)
        })
    ;

    log('line after')




    // let el = yield driver.findElement(By.linkText('Link=equalssign'));
    //
    // let id = yield el.getAttribute('id');
    //
    // driver.findElements(By.id('2'));
    // assert(elements.length


    // driver.findElement(webdriver.By.css('#go')).click();


    // driver.findElement(webdriver.By.name('btnG')).click();



    driver.getTitle().then(function(title) {
        console.log(title);
    });

}
catch (e) {
    log('exception');
    driver.quit();
    throw e;
}


driver.quit();

