#!/bin/bash

/bin/bash start-tunnel.sh
java -jar ../selenium-server-standalone-3.4.0.jar -role node -port 5560 -host 127.0.0.1 -hub http://123.123.123.123:4444/grid/register -browser "browserName=chrome, maxInstances=10, platform=MAC" -browser "browserName=firefox, maxInstances=10, platform=MAC" -browser "browserName=safari, maxInstances=10, platform=MAC"
