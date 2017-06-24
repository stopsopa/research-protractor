#!/bin/bash

cd /Users/admin/Workspace/sel/mac

VBoxManage startvm "vagrant-windows-selenium"

sleep 70 && /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome http://123.123.123.123:4444/grid/console?refresh=10 &

/bin/bash start-selenium.sh


