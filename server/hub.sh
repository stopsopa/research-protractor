#!/bin/bash

echo "stopping hub"

kill -9 $(ps aux | grep -v grep | grep selenium | awk '{print $2}')

echo 'is killed?'

ps aux | grep -v grep | grep selenium

if [ "$1" != "stop" ]; then
    echo "starting hub"
    java -jar selenium-server-standalone-3.4.0.jar -role hub & disown
fi