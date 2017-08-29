
Table of contents
=================

  * [Overview](#overview)
  * [Building HUB](#building-hub)
  * [Setup Mac (host) node and configure browsers](#setup-mac-host-node-and-configure-browsers)
  * [Creating and configuring virtual machine with Windows](#creating-and-configuring-virtual-machine-with-windows)
  * [Launch at startup Windows](#launch-at-startup-windows)
  * [Launch at startup Mac](#launch-at-startup-mac)
  * [Wakeup screen for safari](#wakeup-screen-for-safari)
  * [Cli](#cli)
  * [VNC access](#vnc-access)
  * [Usefull links](#usefull-links)
  * [Known issues](#known-issues)

# Overview

To prepare selenium server first is good to understand what and how we want to achieve.

The general schema is:
![schema](https://stopsopa.github.io/research-protractor/img/schema.png)

end result (visual):
![schema](https://stopsopa.github.io/research-protractor/img/desktop.jpg)


On schema we can see that two selenium nodes (one on host mac and another form windows on virtual machine) gonna register themselvs to hub. From now on hub will spread instructions betwen two nodes and will be able to control browsers automatically. 
Selenium nodes use different webdrivers to communicate with different browsers.
Additionally because MAC machine is behind NAT we gonna build two tunnels from it to server to provide communication channel from server (hub) to MAC and to Windows (nodes) in VM.

At the end it would be nice to configure MAC machine and VM with Windows to automatically register nodes to hub after starting machine.

For this tutorial lets make one assumption:

Our server will have public ip 123.234.123.234

# Building HUB:

WGET selenium jar file (currently [3.5.2](http://www.seleniumhq.org/download/))

Then download [hub.sh](https://github.com/stopsopa/research-protractor/blob/master/server/hub.sh) to the same directory and run:

    /bin/bash hub.sh 
    
If you need to stop/kill hub:
    
    /bin/bash hub.sh stop
    
Then you can check if hub is up and running:

    http://123.234.123.234:4444/grid/console
    
   
# Setup Mac (host) node and configure browsers   
  
Make sure that you have installed:

- VirtualBox Guest Additions
- [git](https://git-scm.com/) 
- [java](https://java.com/en/download/manual.jsp) 
- [chrome](https://www.google.com/chrome/browser/desktop/index.html)
- [firefox](https://www.mozilla.org/en-GB/firefox/new/)
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- [Vagrant](https://www.vagrantup.com/downloads.html)
   
Clone this git repository and change value of parameter **HOST** in this file to ip of your server for host.

(before running this below commands, make sure that you have authorised ssh key in under path **../ssh/id_rsa** to connect to server)

(also check if [*Allow Remote Automation*](https://webkit.org/blog/6900/webdriver-support-in-safari-10/) in Safari is enabled)
![Allow Remote Automation](https://stopsopa.github.io/research-protractor/img/safari-dev.jpg)

    cd mac
    /bin/bash start-selenium.sh 

then check in the browser (on mac) status of node:

    http://localhost:5560/grid/console
    
and check hub in browser (anywhere) ...

    http://123.234.123.234:4444/grid/console
    
    
... chrome, firefox and safari from host mac machine should be already registered with hub.
    
# Creating and configuring virtual machine with Windows
    
First we need to download one of Windows [images](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/). In our case "Microsoft Edge on Win10 (x64) Stable (15.15063)"
    
google: "Test Microsoft Edge and versions of IE8 through IE11 using free virtual machines you download and manage locally."    
    
Then we can create Virtual machine using [Vagrantfile](https://github.com/stopsopa/research-protractor/blob/master/Vagrantfile)
    
Next install inside VM: 

- [ContextConsole Shell Extension](http://code.kliu.org/cmdopen/)
- [git](https://git-scm.com/) 
- [java](https://java.com/en/download/manual.jsp) 
- [chrome](https://www.google.com/chrome/browser/desktop/index.html)
- [firefox](https://www.mozilla.org/en-GB/firefox/new/)

Execute two .reg files windows/feature_bfcache32.reg and windows/feature_bfcache64.reg


Clone this repository and go to *windows* directory in this repository and run:
    
(before running this below commands, make sure that you have authorised ssh key in under path *..\ssh\id_rsa.ppk* to connect to server)

additionally before running this setup ie 11 like it is described here:
http://elgalu.github.io/2014/run-protractor-against-internet-explorer-vm/#step4

img copy because article is not new and there is risk that it can disappear:
google(Run Protractor Against Internet Explorer VM elgulu)

Folow required configuration for IEDriver [https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver#required-configuration]

![image copy of page](https://stopsopa.github.io/research-protractor/img/ie11-setup.jpg)

source for IEWebdriver : http://selenium-release.storage.googleapis.com/
better use 32 bit version instead of 64 bit [issues](http://elgalu.github.io/2014/run-protractor-against-internet-explorer-vm/#step5)

    cd windows
    start.cmd 123.234.123.234

then check in the browser (on windows) status of node:

    http://localhost:5560/grid/console
    
and check hub in browser (anywhere) ...

    http://123.234.123.234:4444/grid/console
    
    
... chrome, firefox, edge and IE 11 from host mac machine should be already registered with hub.

Additionally is good to disable putting display to sleep:


![schema](https://stopsopa.github.io/research-protractor/img/power-settings.png)
    
# Launch at startup Windows
    
    explorer "%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup"
    
scripts to run at startup 

    windows/start-tunnel.cmd
    windows/start-selenium.cmd
    
## Microsoft Edge configuration


![edge configuration](https://stopsopa.github.io/research-protractor/img/edge.jpg)    
    
    
# Launch at startup Mac
    
Following instructions from (https://www.davidbaumgold.com/tutorials/wine-mac/#making-a-dock-icon) compile app in **AppleScript Editor**

    tell application "Terminal"
        do script "~/pathtoscript ~/.app/drive_c/Program\\ Files/start.sh"
    end tell
    
scripts to run at startup 

    /bin/bash mac/startup.sh
    
[start.sh](https://github.com/stopsopa/research-protractor/blob/master/mac/startup.sh)

# Wakeup screen for safari

![image copy of page](https://stopsopa.github.io/research-protractor/img/energy-saver.png)
![image copy of page](https://stopsopa.github.io/research-protractor/img/screen-saver.png)

In start-selenium.sh is already implemented mechanizm to wakeup screen when cpu usage rise above 100% (change that if you need)

# Cli
        
    node protractor.sh
    node protractor.sh --specs ../test/ng.js
    node protractor.sh --specs ../test/ng.js -b mc
       # mac chrome
    node protractor.sh --specs ../test/ng.js -b mcwewi
       # mac chrome, windows edge, windows IE11
       # more details look parameter "flag" under:
       # https://github.com/stopsopa/research-protractor/blob/master/protractor/config.js#L22
    npm run start
    npm run stop
    npm run status
    
# VNC access

check https://github.com/stopsopa/research-protractor/blob/master/mac/vnc-tunnel.sh

Before running that you should enable screen sharing in mac
![schema](https://stopsopa.github.io/research-protractor/img/vnc.jpg)
        
# Usefull links

General documentation

- table of content: http://www.protractortest.org/#/toc
- (Protractor API 5.1.2) http://www.protractortest.org/#/api 
- main config: https://github.com/angular/protractor/blob/5.1.2/lib/config.ts#L644

other:

- suites: http://www.protractortest.org/#/page-objects#configuring-test-suites

ExpectedConditions:

- https://github.com/angular/protractor/blob/master/lib/expectedConditions.ts
    
testing not angular:
    
- https://github.com/sakshisingla/Protractor-Non-Angular-Tests/wiki/Creating-test-scripts-using-Protractor-for-non-angular-application

# Known issues

- [slow clicking ie11](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/5116)
- [Safari - angular not found](https://github.com/angular/protractor/issues/3118)

# Updating selenium and webdrivers

known issues:


---



    [11:20:06] E/runner - Unable to start a WebDriver session.
    [11:20:06] E/launcher - Error: WebDriverError: Invalid timeout type specified: ms
    
    
https://github.com/angular/protractor/issues/4445#issuecomment-323288177

looks like problem with unstable latest release of selenium.. wait for another update/fix :/


---

 