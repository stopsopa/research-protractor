#!/bin/bash

# run as sudo one of commands
# /bin/bash start.sh         - only kills selenium and php server
# /bin/bash start.sh start   - kills selenium and php servers, runs them again, and execute tests
# /bin/bash start.sh test    - run selenium and php server if its not running and execute tests - most convenient to run tests again and again

# /bin/bash start.sh test --specs test/calc-multiple.js      - execute only one script (you can pass this way more arguments for native protractor command)
# /bin/bash start.sh --specs test/dir/\*.js                  - run in 'start' mode (means kill service and start again, then run tests)
# /bin/bash start.sh test --specs test/dir/\*.js             - run in 'test' mode (run just test if services are running)

# WARNING: with --specs parameter use rather \* wildcard then just * because * is resolved in bash shell but \* is resolved by protractor itself

USER=$(whoami)

if [ $USER != 'root' ]; then
    cat $0 | head -n 13 | tail -n 11
    exit 1;
fi

ARGSNUM=$#;

if [ "$1" = "test" ]; then
    TEST="test"
    shift
else
    if [ "$1" = "start" ]; then shift; fi
    TEST=""
fi

ARGS="";
while [[ $# -gt 0 ]]; do
    key="$1"
    if [ "$ARGS" != "" ]; then ARGS="$ARGS "; fi
    ARGS="${ARGS} \"${key}\""
    # Shift after checking all the cases to get the next option
    shift
done

ISRUNNING=$(ps aux | grep 'selenium-server-standalone' | grep -v grep);

if [ "$ISRUNNING" != "" ] && [ "$TEST" != "test" ]; then

    echo ""
    echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
    echo "vvvvvvvvvvv stopping selenium service vvvvvvvvvvv";
    echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
    kill -9 $(ps aux | grep 'selenium-server-standalone' | grep -v grep | awk '{print $2}') &> /dev/null
    kill $(ps aux | grep 'selenium-server-standalone' | grep -v grep | awk '{print $2}') &> /dev/null

    echo ""
    echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
    echo "vvvvvvvvvvv stopping php service vvvvvvvvvvv";
    echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
    kill $(ps aux | grep 'php -S' | grep -v grep) &> /dev/null
    kill $(ps aux | grep 'php -S' | grep -v grep) &> /dev/null
fi

if [ "$ARGSNUM" -lt 1 ] ; then
    cat $0 | head -n 13 | tail -n 11
else

    ISRUNNING=$(ps aux | grep 'selenium-server-standalone' | grep -v grep);

    if [ "$ISRUNNING" = "" ]; then
        echo "";
        echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
        echo "vvvvvvvvvvv starting php server vvvvvvvvvvv";
        echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
        cd ..
        php -S localhost:1025 & disown
        cd protractor
        sleep 1

        if [ ! -e node_modules/webdriver-manager/selenium ]; then
            node node_modules/protractor/bin/webdriver-manager update
        fi

        # first install globally webdriver, follow: http://www.protractortest.org/#/
        echo "";
        echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
        echo "vvvvvvvvvvv starting selenium server vvvvvvvvvvv";
        echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
        # nun before
        # sudo node node_modules/protractor/bin/webdriver-manager update
        node node_modules/protractor/bin/webdriver-manager start & disown
        sleep 4
    fi

    CMD=$(echo "node node_modules/protractor/bin/protractor conf.js $ARGS" | sed 's/*/\\\*/g')

    echo "";
    echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
    echo "vvvvvvvvvvv executing tests vvvvvvvvvvv";
    echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";

    echo $CMD | /bin/bash

    EX=$?

    echo "";
    echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
    echo "vvvvvvvvvvvvvvvvvv summary vvvvvvvvvvvvvvvvvvvvv";
    echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
    echo "executed command:"
    echo '>' $CMD
    echo '> INFO: if you want to use browser.pause() run this command manually'
    echo "exit code:" $EX

    # return status code from phpunit for jenkins
    exit $EX;
fi
