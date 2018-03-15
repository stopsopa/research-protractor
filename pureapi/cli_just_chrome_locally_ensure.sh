#!/bin/bash

# /bin/bash cli_just_chrome_locally_ensure.sh

THISFILE=${BASH_SOURCE[0]}
DIR="$( cd "$( dirname "${THISFILE}" )" && pwd -P )"
echo $DIR;

source "$DIR/config.sh";

STATUS="curl --max-time $CURL_TEST_MAX_TIME http://$HUB_HOST:$HUB_PORT/grid/console"
echo -e "\n >>>> " $STATUS "\n"
RESPONSE=$($STATUS);

HUB="http://$HUB_HOST:$HUB_PORT/grid/console?config=true&configDebug=true&refresh=10"
NODE="http://$NODE_HOST:$NODE_PORT"
CONNECTION="Connection refused"

if [[ $RESPONSE = *"$NODE"* ]]; then

    echo -e "\n  Node $NODE is registered in hub $HUB\n"

    if [[ $RESPONSE != *"$CONNECTION"* ]]; then

        echo -e "\n  Node $NODE is registered in hub $HUB and seems to work\n"

        echo -e "\n  All good... \n"

        exit 0;

    else
        echo -e "\n\n    ERROR: Node $NODE is registered in hub $HUB but it doesn't seem work\n\n"
    fi
else
    echo -e "\n\n    ERROR: Node $NODE is NOT registered in hub $HUB\n\n"
fi


if [ "$1" = "" ]; then

    echo -e "\n\n    Let's try to restart...\n\n";

    /bin/bash cli_just_chrome_locally.sh

    sleep $WAIT_TO_RUN_SELENIUM_CLUSTER

    /bin/bash cli_just_chrome_locally_ensure.sh don-t-restart
else

    echo -e "\n\n    Test after attempt to restart failed anyway - please check it manually, i give up :/ \n\n"
fi


