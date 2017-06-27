#!/bin/bash
while :
do
    date +"%Y-%m-%d %H:%M:%S--------------"
    /bin/bash mac/locker.sh
    cd protractor

    OUTPUT=$(node protractor.js --specs ../tests/nong.js)
    echo $?
    echo "$OUTPUT" | tail -n 8

    OUTPUT=$(node protractor.js --specs ../tests/nong.js)
    echo $?
    echo "$OUTPUT" | tail -n 8

    cd ..
    NEXT=$((40 + RANDOM % 600));
    echo next time $(bc -l <<< "$NEXT/60")
    sleep $NEXT # from 40 sec to 10 min
done

# run
# /bin/bash long-test.sh | tee log.log

