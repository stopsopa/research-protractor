#!/bin/bash

/bin/bash start-tunnel.sh
java -jar ../selenium-server-standalone-3.4.0.jar -role node -port 5560 -host 127.0.0.1 -hub http://123.123.123.123:4444/grid/register -browser "browserName=chrome, maxInstances=10, platform=SIERRA" -browser "browserName=firefox, maxInstances=10, platform=SIERRA" -browser "browserName=safari, maxInstances=10, platform=SIERRA"
# https://seleniumhq.github.io/selenium/docs/api/java/org/openqa/selenium/Platform.html