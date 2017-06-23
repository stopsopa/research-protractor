#!/bin/bash

ssh-add /Users/admin/Workspace/sel/ssh/id_rsa
chmod 600 ../ssh/id_rsa

IP="123.123.123.123"
PORT=5900
# 5900 is reserved by vnc https://support.apple.com/en-gb/HT202944
kill -9 $(ps aux | grep -v grep | grep ssh | grep $PORT | grep "\-R " | awk '{print $2}') &> /dev/null

if [ "$1" != "stop" ]; then
	echo starting tunnel
	ssh root@$IP -N -R 0.0.0.0:$PORT:localhost:$PORT -i ../ssh/id_rsa & disown
fi

# add also GatewayPorts yes to /etc/ssh/sshd_config
# https://superuser.com/a/588773
