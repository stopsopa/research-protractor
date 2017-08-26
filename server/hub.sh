#!/bin/bash

echo "stopping hub"

kill -9 $(ps aux | grep -v grep | grep selenium | grep -v $$ | awk '{print $2}')

echo 'is killed?'

if [ "$1" != "stop" ]; then
    echo "starting hub"
    java -jar ../selenium-server-standalone-3.5.2.jar -role hub & disown
fi