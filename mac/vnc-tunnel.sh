#!/bin/bash

ssh-add /Users/admin/Workspace/sel/ssh/id_rsa
chmod 600 ../ssh/id_rsa

PORT=5900
IP="123.123.123.123"
# 5900 is reserved by vnc https://support.apple.com/en-gb/HT202944
kill -9 $(ps aux | grep -v grep | grep ssh | grep $PORT | grep "\-R " | awk '{print $2}') &> /dev/null

if [ "$1" != "stop" ]; then

    # while true
    while :
    do
        # TEST=$(ps aux | grep -v grep | grep ssh | grep $PORT && echo 'true' || echo 'false');

        # if [ "$TEST" == "false" ]; then
        # fi

        kill -9 $(ps aux | grep -v grep | grep ssh | grep $PORT | grep "\-R " | awk '{print $2}') &> /dev/null
        ssh root@$IP -N -R 0.0.0.0:$PORT:localhost:$PORT -i ../ssh/id_rsa & disown
        echo 'done';
        sleep 120
    done	


fi

# add also GatewayPorts yes to /etc/ssh/sshd_config
# https://superuser.com/a/588773
