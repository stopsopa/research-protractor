#!/bin/bash

while :
do
    date +"%Y-%m-%d %H:%M:%S--------------"
    /bin/bash mac/locker.sh
    cd protractor
    OUTPUT=$(node protractor.js --specs ../tests/nong.js)
    echo $?
    echo "$OUTPUT" | tail -n 8
    cd ..
    sleep $((40 + RANDOM % 600)) # from 40 sec to 10 min
done


