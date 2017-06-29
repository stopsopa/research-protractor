#!/bin/bash

source config.sh

ssh-add ../ssh/id_rsa
chmod 600 ../ssh/id_rsa

kill -9 $(ps aux | grep -v grep | grep ssh | grep $MACPORT | grep "\-R " | awk '{print $2}') &> /dev/null

if [ "$1" != "stop" ]; then
    echo starting tunnel
    ssh root@$HOST -N -R $MACPORT:127.0.0.1:$MACPORT -i ../ssh/id_rsa & disown
fi
