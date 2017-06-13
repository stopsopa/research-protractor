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


- Run selenium

    docker run --restart=always -d -p 4444:4444 --name selenium-hub selenium/hub:3.4.0-chromium
    docker run --restart=always -d --link selenium-hub:hub selenium/node-chrome:3.4.0-chromium
    docker run --restart=always -d --link selenium-hub:hub selenium/node-firefox:3.4.0-chromium
       
    docker run --rm -d -p 4444:4444 --name selenium-hub selenium/hub:3.4.0-chromium
    docker run --rm -d --link selenium-hub:hub selenium/node-chrome:3.4.0-chromium
    docker run --rm -d --link selenium-hub:hub selenium/node-firefox:3.4.0-chromium
    
    -
    
then test:
    
        # ip of docker-machine
        curl 192.168.180.130:4444/wd/hub
     
    -
    
Compose:

https://carlosbecker.com/posts/selenium-grid-docker-compose/



    selenium-hub:
      image: selenium/hub:3.4.0-chromium
      ports:
        - 4444:4444
    
    selenium-chrome:
      image: selenium/node-chrome:3.4.0-chromium
      ports:
        - 5900
      links:
        - selenium-hub:hub
    
    selenium-firefox:
      image: selenium/node-firefox:3.4.0-chromium
      ports:
        - 5900
      links:
        - selenium-hub:hub
        
and run
            
    docker-compose up -d

Then go to http://localhost:4444/grid/console
    
Run on prod (restarting containers periodically):

- https://www.addteq.com/blog/2016/09/setting-up-a-selenium-grid-with-docker-containers-for-multi-browser-coverage

# internet explorer vvv

Microsoft virtual machines images - useful links:

- https://github.com/crohr/ebarnouflant/issues/7
- https://github.com/dmstr/phd5-docs/blob/master/guide/tutorials/testing-internet-explorer.md
- http://www.giuseppecilia.com/2016/04/18/selenium-grid-on-microsoft-edge-browser/

Building vagrant image:
    
download image from:
https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/
g(Test Microsoft Edge and versions of IE8 through IE11 using free virtual machines you download and manage locally)
and convert to vagrant image like:

     VBoxManage import ./MSEdgeWin10_preview.ova --vsys 0 --eula accept
     VBoxManage list vms
     vagrant package --base 9cbc92eb-77a7-4f1f-80cd-bcf9b4067208 --output MsEdgeWin10preview.box
     vagrant box add MsEdgeWin10preview.box --name MsEdgeWin10preview     
     
     
disable firewall (to be able to ping)     
check if you can ping from hub to windows and from windows to hub

install java: http://java.com/en/download/manual.jsp

download matching WebDriver for browser: 
- http://i.imgur.com/B576h7l.png
- g(Microsoft WebDriver edge) 
- https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
- http://www.automationtestinghub.com/selenium-3-launch-microsoft-edge-with-microsoftwebdriver/


    systeminfo | findstr /B /C:"OS Name" /C:"OS Version"

    
     
then just run MicrosoftWebDriver.exe wherever it is, can be under if installed from msi:
C:\\Program Files (x86)\\Microsoft Web Driver\\MicrosoftWebDriver.exe

download selenium jar file:
http://www.seleniumhq.org/download/

then run selenium:

    java -jar selenium-server-standalone-3.4.0.jar -role node -port 5555 -hub http://192.168.180.130:4444/grid/register -browser "browserName=MicrosoftEdge,platform=WINDOWS"
    

     
     
java -jar selenium-server-standalone-2.53.0.jar -port 5555 -role node -hub http://<host>:4444/grid/register -browser "browserName=MicrosoftEdge,platform=WINDOWS,maxInstances=10" -Dwebdriver.edge.driver=C:/Path/To/MicrosoftWebDriver.exe
     
java -Dwebdriver.edge.driver=C:\Selenium\MicrosoftWebDriver.exe -Dwebdriver.chrome.driver=C:\Selenium\chromedriver.exe -jar C:\Selenium\selenium-server-standalone-3.0.1.jar -role webdriver -hub http://10.10.1.20:4444/grid/register -port 5566 -maxSession 5 -browser "browserName=MicrosoftEdge,platform=WINDOWS" -browser "browserName=chrome,platform=WINDOWS,maxInstances=5" -browser "browserName=firefox,platform=WINDOWS,maxInstances=5"     
     
# internet explorer ^^^

Addons:

Which witch is which in selenium? 

- http://yizeng.me/2014/04/25/relationships-between-different-versions-of-selenium/
- http://www.aosabook.org/en/selenium.html

