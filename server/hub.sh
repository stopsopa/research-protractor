#!/bin/bash

echo "stopping hub"

echo "working directory: $(pwd)"

kill -9 $(ps aux | grep -v grep | grep selenium | grep -v $$ | awk '{print $2}')

echo 'is killed?'

if [ "$1" != "stop" ]; then
    echo "starting hub"
    java -jar ../selenium-server-standalone-3.4.0.jar -role hub & disown
fi