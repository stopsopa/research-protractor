# local intance of selenium

sel: selenium-start
sels: selenium-stop

selenium-start:
	cd pureapi && /bin/bash cli_just_chrome_locally_ensure.sh

selenium-stop:
	cd pureapi && /bin/bash cli_just_chrome_locally.sh stop
