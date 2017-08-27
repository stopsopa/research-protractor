java -jar ..\selenium-server-standalone-3.5.2.jar ^
-role node ^
-port 5559 ^
-host 127.0.0.1 ^
-hub http://%1:4444/grid/register ^
-browser "browserName=MicrosoftEdge, maxInstances=10, platform=WIN10" ^
-browser "browserName=chrome, maxInstances=10, platform=WIN10" ^
-browser "browserName=firefox, maxInstances=10, platform=WIN10" ^
-browser "browserName=internet explorer, version=11, maxInstances=10, platform=WIN10"
