#!/bin/bash

#echo "stopping docker containers"
#docker stop  $(docker ps | awk '{print $1}' | grep -v CONT)

echo "stopping hub"

kill -9 $(ps aux | grep -v grep | grep selenium | awk '{print $2}')

echo 'is killed?'

ps aux | grep -v grep | grep selenium

if [ "$1" != "stop" ]; then
    echo "starting hub"
    java -jar selenium-server-standalone-3.4.0.jar -role hub & disown
fi

#echo "starting docker containers"
#docker run --rm -d -p 4444:4444 -p 5555:5555 -p 5556:5556 --name selenium-hub selenium/hub:3.4.0-chromium
#docker run --rm -d -p 5900:5900 --link selenium-hub:hub selenium/node-chrome-debug:3.4.0-chromium
#docker run --rm -d -p 5901:5900 --link selenium-hub:hub selenium/node-firefox-debug:3.4.0-chromium

#docker ps -a