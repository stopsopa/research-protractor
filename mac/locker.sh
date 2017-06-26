#!/bin/bash

function locked {
    if [ "$(python -c "import Quartz;d = Quartz.CGSessionCopyCurrentDictionary();print d" | grep CGSSessionScreenIsLocked)" == "" ]; then
        echo "unlocked";
    else
        echo "locked";
    fi
}

if [ "$1" == "lock" ]; then
    pmset displaysleepnow
    exit;
fi

if [ "$1" == "unlock" ]; then
    caffeinate -u -t 5
    exit;
fi

if [ "$1" == "send" ]; then
    ssh root@123.123.123.123 "echo $(locked) > locked"
fi

if [ "$1" == "loop" ]; then
    while :
    do
        /bin/bash $0 send
        printf .
        sleep 1
    done
fi

echo $(locked);
