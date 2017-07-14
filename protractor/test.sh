#!/bin/bash

node protractor.js --specs tests/nong.js
node protractor.js --specs tests/nong.js

CODE=$?;

if [ "$CODE" == "0" ]; then
    echo 'true'
else
    echo 'false'
fi