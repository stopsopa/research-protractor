#!/bin/bash

ssh-add ../ssh/id_rsa
chmod 600 ../ssh/id_rsa

# 5900 is reserved by vnc https://support.apple.com/en-gb/HT202944
kill -9 $(ps aux | grep -v grep | grep ssh | grep -v 5900 | grep "\-R " | awk '{print $2}') &> /dev/null

if [ "$1" != "stop" ]; then
	echo starting tunnel
	ssh root@123.123.123.123 -N -R 5560:127.0.0.1:5560 -i ../ssh/id_rsa & disown
fi
