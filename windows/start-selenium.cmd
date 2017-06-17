
REM java -jar ..\selenium-server-standalone-3.4.0.jar -role node -port 5559 -host 127.0.0.1 -hub http://123.123.123.123:4444/grid/register -browser "browserName=MicrosoftEdge,platform=WINDOWS" -browser "browserName=internet explorer, version=11, platform=WINDOWS" -browser "browserName=chrome,platform=WINDOWS" -browser "browserName=firefox,platform=WINDOWS"

java -jar ..\selenium-server-standalone-3.4.0.jar -role node -port 5559 -host 127.0.0.1 -hub http://123.123.123.123:4444/grid/register -browser "browserName=MicrosoftEdge, maxInstances=10, platform=WINDOWS" -browser "browserName=chrome, maxInstances=10, platform=WINDOWS" -browser "browserName=firefox, maxInstances=10, platform=WINDOWS"
