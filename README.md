To prepare selenium server first is good to understand what and how we want to achieve.

The general schema is:


On schema we can see that two selenium nodes (one on host mac and another form windows on virtual machine) gonna register themselvs to hub. From now on hub will spread instructions betwen two nodes and will be able to control browsers automatically. 
Selenium nodes use different webdrivers to communicate with different browsers.
Additionally because MAC machine is behind NAT we gonna build two tunnels from it to server to provide communication channel from server (hub) to MAC and to Windows (nodes) in VM.

At the end it would be nice to configure MAC machine and VM with Windows to automatically register nodes to hub after starting machine.

For this tutorial lets make one assumption:

Our server will have public ip 123.234.123.234

# Building HUB:

WGET selenium jar file (currently [3.4.0](http://www.seleniumhq.org/download/))

Then download [hub.sh](https://github.com/stopsopa/research-protractor/blob/master/server/hub.sh) to the same directory and run:

    /bin/bash hub.sh 
    
If you need to stop/kill hub:
    
    /bin/bash hub.sh stop
    
Then you can check if hub is up and running:

    http://123.234.123.234:4444/grid/console
    
Hub should be now up and running... 
   
# Setup Mac (host) node and configure browsers   
  
Make sure that you have installed:

- [git](https://git-scm.com/) 
- [java](https://java.com/en/download/manual.jsp) 
- [chrome](https://www.google.com/chrome/browser/desktop/index.html)
- [firefox](https://www.mozilla.org/en-GB/firefox/new/)
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- [Vagrant](https://www.vagrantup.com/downloads.html)
   
Clone this git repository and run in main directory of it (replace in this regexps second ip for your server ip):
  
   
    find . -type f -name '*.sh' -exec sed -i '' -e 's/123.123.123.123/123.234.123.234/g' {} +
    find . -type f -name '*.cmd' -exec sed -i '' -e 's/123.123.123.123/123.234.123.234/g' {} +
   
now go to *mac* folder in this git repository and execute two scripts. One to launch ssh tunnel and another to launch node:

(before running this below commands, make sure that you have authorised ssh key in under path *../ssh/id_rsa* to connect to server)

(also check if [*Allow Remote Automation*](https://webkit.org/blog/6900/webdriver-support-in-safari-10/) in Safari is enabled)
![Allow Remote Automation](https://raw.githubusercontent.com/stopsopa/research-protractor/master/doc/safari-dev.jpg)

    cd mac
    /bin/bash start-selenium.sh 

then check in the console status of node:

    http://123.234.123.234:4444/grid/console
    
chrome, firefox and safari from host mac machine should be already registered in hub.
    
# Creating and configuring virtual machine with Windows
    
First we need to download one of [Windows vagrant image](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/)
    
google: "Test Microsoft Edge and versions of IE8 through IE11 using free virtual machines you download and manage locally."    
    
Then we can create Virtual machine using [Vagrantfile](https://github.com/stopsopa/research-protractor/blob/master/Vagrantfile)
    
Next install inside VM: 

- [git](https://git-scm.com/) 
- [java](https://java.com/en/download/manual.jsp) 
- [chrome](https://www.google.com/chrome/browser/desktop/index.html)
- [firefox](https://www.mozilla.org/en-GB/firefox/new/)

and this git clone repository and go to *windows* directory in this repository and run:
    
(before running this below commands, make sure that you have authorised ssh key in under path *..\ssh\id_rsa.ppk* to connect to server)

additionally before running this setup ie 11 like it is described here:
http://elgalu.github.io/2014/run-protractor-against-internet-explorer-vm/#step4

img copy because article is not new and there is risk that it can disappear:
google(Run Protractor Against Internet Explorer VM)
![image copy of page](https://raw.githubusercontent.com/stopsopa/research-protractor/master/doc/ie11-setup.jpg)

source for IEWebdriver : http://selenium-release.storage.googleapis.com/
better use 32 bit version instead of 64 bit [issues](http://elgalu.github.io/2014/run-protractor-against-internet-explorer-vm/#step5)

    cd windows
    start.cmd 123.234.123.234
    
then check in the console status of node:

    http://123.234.123.234:4444/grid/console
    
chrome, firefox, edge and IE 11 from host mac machine should be already registered in hub.
    
# Launch at startup Windows
    
    explorer "%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup"
    
# Launch at startup Mac
    
Following instructions from (https://www.davidbaumgold.com/tutorials/wine-mac/#making-a-dock-icon) compile app in **AppleScript Editor**

    tell application "Terminal"
        do script "~/pathtoscript ~/.app/drive_c/Program\\ Files/start.sh"
    end tell
    
[start.sh](https://github.com/stopsopa/research-protractor/blob/master/mac/startup.sh)
        
        
