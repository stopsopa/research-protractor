#!/bin/bash

# /bin/bash prot.sh         - only kills selenium and php server
# /bin/bash prot.sh start   - kills selenim and php servers, runs them again, and execute tests
# /bin/bash prot.sh test    - run selenium and php server if its not running and execute tests - most convenient to run again and again

# /bin/bash prot.sh test --specs test/calc-multiple.js  - execute only one script (you can pass this way more arguments for native protractor)
# /bin/bash prot.sh --specs test/dir/\*.js   - run in start mode (means kill service and start again, then run tests)
# /bin/bash prot.sh test --specs test/dir/\*.js - run in test mode (run just test if services are running)

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

    echo "> stopping selenium service";
    kill -9 $(ps aux | grep 'selenium-server-standalone' | grep -v grep | awk '{print $2}') &> /dev/null
    kill $(ps aux | grep 'selenium-server-standalone' | grep -v grep | awk '{print $2}') &> /dev/null

    echo "> stopping php service";
    kill $(ps aux | grep 'php -S' | grep -v grep) &> /dev/null
    kill $(ps aux | grep 'php -S' | grep -v grep) &> /dev/null
fi

if [ "$ARGSNUM" -lt 1 ] ; then
	echo "> call: /bin/bash $0 start";
	echo 'or to run only tests:';
	echo "> call: /bin/bash $0 test";
else

    ISRUNNING=$(ps aux | grep 'php -S' | grep -v grep);

    if [ "$ISRUNNING" = "" ]; then

        echo "> starting php server"
        php -S localhost:80 & disown
        sleep 1

        # first install globally webdriver, follow: http://www.protractortest.org/#/
        echo "> starting selenium server"
        webdriver-manager start & disown
        sleep 4
    fi

    echo "protractor conf.js $ARGS" | tr '*' '\*' | /bin/bash

    # return status code from phpunit for jenkins
    exit $?;
fi
