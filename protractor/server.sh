#!/bin/bash

# it is good idea to run this server on dev machines in separate terminal

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


if [ "$1" != "stop" ]; then

    echo "";
    echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
    echo "vvvvvvvvvvv starting php server vvvvvvvvvvv";
    echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
    cd ..
    php -S localhost:1025 & disown
    cd protractor
    sleep 1

    if [ ! -e node_modules/webdriver-manager/selenium ]; then
        echo "";
        echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
        echo "vvvvvvvvvvvvv webdriver update vvvvvvvvvvvv";
        echo "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv";
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
    echo "";
    echo "run";
    echo "/bin/bash $0 $1stop";
    echo "to stop selenium server";
#else
fi

