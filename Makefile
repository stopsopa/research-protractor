# local intance of selenium

sel: selenium-start
sels: selenium-stop

selenium-start:
	cd pureapi && /bin/bash local_selenium_server_ensure.sh

selenium-stop:
	cd pureapi && /bin/bash local_selenium_server.sh stop
