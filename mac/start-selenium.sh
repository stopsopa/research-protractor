#!/bin/bash


kill -9 $(ps aux | grep -v grep | grep vnc-tunnel | awk '{print $2}') &> /dev/null

kill -9 $(ps aux | grep -v grep | grep locker.sh | awk '{print $2}') &> /dev/null

kill -9 $(ps aux | grep -v grep | grep selenium-server | awk '{print $2}') &> /dev/null

if [ "$1" == "stop" ]; then
    exit 0;
fi

source config.sh

ssh-add ../ssh/id_rsa
chmod 600 ../ssh/id_rsa

/bin/bash start-tunnel.sh

/bin/bash vnc-tunnel.sh & disown

/bin/bash locker.sh watchdog & disown

java -jar ../selenium-server-standalone-3.4.0.jar -role node -port 5560 -host 127.0.0.1 -hub http://$HOST:4444/grid/register -browser "browserName=chrome, maxInstances=10, platform=SIERRA" -browser "browserName=firefox, maxInstances=10, platform=SIERRA" -browser "browserName=safari, maxInstances=10, platform=SIERRA"
