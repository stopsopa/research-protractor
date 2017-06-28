#!/bin/bash

source config.sh

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
    ssh root@$HOST "echo $(locked) > locked"
    exit;
fi

if [ "$1" == "cpu" ]; then
    ps -A -o %cpu | awk '{s+=$1} END {print s}'
    exit;
fi

if [ "$1" == "watchdog" ]; then
    while :
    do
        TEST=$(/bin/bash $0 cpu)
        TEST=$(printf "%.0f" $TEST)
        TEST=$(( $TEST + 0 )) # CAST TO INT
        if [ $TEST -gt 90 ]; then
            /bin/bash $0 unlock
            printf u
        else
            printf .
        fi
        sleep 0.5
    done
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