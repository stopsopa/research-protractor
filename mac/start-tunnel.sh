#!/bin/bash

source config.sh

ssh-add ../ssh/id_rsa
chmod 600 ../ssh/id_rsa

PORT=5560

kill -9 $(ps aux | grep -v grep | grep ssh | grep $PORT | grep "\-R " | awk '{print $2}') &> /dev/null

if [ "$1" != "stop" ]; then
    echo starting tunnel
    ssh root@$HOST -N -R $PORT:127.0.0.1:$PORT -i ../ssh/id_rsa & disown
fi
