
HUB_HOST=$(node configReader.js --param hub.host)
HUB_PORT=$(node configReader.js --param hub.port)

NODE_HOST=$(node configReader.js --param node.host)
NODE_PORT=$(node configReader.js --param node.port)

CURL_TEST_MAX_TIME=$(node configReader.js --param curlTestMaxTime) # 1 SEC
WAIT_TO_RUN_SELENIUM_CLUSTER=$(node configReader.js --param waitToRunSeleniumCluster) # 8 SEC

