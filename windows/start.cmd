if "%1" == "stop" (
    set /p d=Enter domain:
) else (﻿
    start start-tunnel.cmd %1
    start-selenium.cmd %1
)