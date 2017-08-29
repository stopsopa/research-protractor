'use strict';

const log = console.log;

var webdriver = require('selenium-webdriver');

// Input capabilities
var capabilities = {
    browserName: "chrome",
    platform: "macOS 10.12",
    flag: 'mc'
};

var driver = new webdriver.Builder()
    // .usingServer('http://localhost:4444/wd/hub')
    .usingServer('http://138.68.156.126:4444/wd/hub')
    .withCapabilities(capabilities)
    .build()
;

driver.get('https://stopsopa.github.io/research-protractor/e2e/nong.html');

driver.findElement(webdriver.By.css('#go')).click();

var div = driver.findElement(webdriver.By.css('div'));

div.getText().then((t) => {
    log('div', t);
})

log('after');

driver.getTitle().then(function(title) {
    log('title', title)
})
;

driver.getTitle().then(function(title) {
    console.log(title);
});


driver.quit();

