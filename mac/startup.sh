#!/bin/bash

THISFILE=${BASH_SOURCE[0]}
DIR="$( cd "$( dirname "${THISFILE}" )" && pwd -P )"
echo $DIR;

source "$DIR/config.sh"

cd /Users/admin/Workspace/sel/mac

VBoxManage startvm "vagrant-windows-selenium"

sleep 70 && /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome http://$HOST:4444/grid/console?refresh=10 &

/bin/bash start-selenium.sh


