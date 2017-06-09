[![Build Status](https://travis-ci.org/stopsopa/research-protractor.svg?branch=master)](https://travis-ci.org/stopsopa/research-protractor)

Most important:

- table of content: http://www.protractortest.org/#/toc
- (Protractor API 5.1.2) http://www.protractortest.org/#/api 
- main config: https://github.com/angular/protractor/blob/5.1.2/lib/config.ts#L644

other:

- suites: http://www.protractortest.org/#/page-objects#configuring-test-suites

ExpectedConditions:

- https://github.com/angular/protractor/blob/master/lib/expectedConditions.ts
    
testing not angular:
    
- https://github.com/sakshisingla/Protractor-Non-Angular-Tests/wiki/Creating-test-scripts-using-Protractor-for-non-angular-application

configuring sauce labs:

- http://dev.topheman.com/setup-travis-ci-saucelabs-for-protractor/
- https://www.youtube.com/watch?v=afy_EEq_4Go
- https://stackoverflow.com/q/29015603  and answer below

Microsoft virtual machines images:

- https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/
- https://github.com/crohr/ebarnouflant/issues/7
- https://github.com/dmstr/phd5-docs/blob/master/guide/tutorials/testing-internet-explorer.md

Run selenium

    docker run -d --rm -p 4444:4444 --name selenium-hub selenium/hub:3.4.0-chromium
    docker run -d --rm --link selenium-hub:hub selenium/node-chrome:3.4.0-chromium
    docker run -d --rm --link selenium-hub:hub selenium/node-firefox:3.4.0-chromium



Addons:

Which witch is which in selenium? 

- http://yizeng.me/2014/04/25/relationships-between-different-versions-of-selenium/
- http://www.aosabook.org/en/selenium.html

