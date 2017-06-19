#!/bin/bash

echo "stopping hub & node"

kill -9 $(ps aux | grep -v grep | grep selenium | grep -v $$ | awk '{print $2}')

echo 'double check:'
ps aux | grep -v grep | grep selenium | grep -v $$

if [ "$1" != "stop" ]; then
    echo "starting hub & node"

    if [ ! -f geckodriver ]; then
        curl -O https://raw.githubusercontent.com/stopsopa/research-protractor/master/mac/chromedriver
        curl -O https://raw.githubusercontent.com/stopsopa/research-protractor/master/mac/geckodriver

        chmod a+x chromedriver
        chmod a+x geckodriver
    fi

    java -jar ../selenium-server-standalone-3.4.0.jar -role hub & disown
    java -jar ../selenium-server-standalone-3.4.0.jar -role node -port 5560 -host 127.0.0.1 -hub http://localhost:4444/grid/register -browser "browserName=chrome, maxInstances=10, platform=MAC" -browser "browserName=firefox, maxInstances=10, platform=MAC" -browser "browserName=safari, maxInstances=10, platform=MAC" & disown

    sleep 8

    echo 'up and running... visit: http://localhost:4444/grid/console?config=true&configDebug=true&refresh=10'
fi



