'use strict';

const path = require('path');
const sync = require('child_process').spawnSync;

console.log('cleanning sessions files');

var proc = sync('/bin/bash', ['cli.sh', 'rm']);

process.env.PROT_SESSION = 'cache_' + ((new Date()).getTime()) + '';

process.argv.splice(2, 0, 'config.js');

var b = '';
if (process.argv.indexOf('-b') > -1) {
    var i = process.argv.indexOf('-b');
    b = process.argv[i + 1];
    process.argv.splice(i, 2);
}

if (b) {
    process.b = b.match(/.{1,2}/g);
}

require(path.resolve(__dirname, 'node_modules', 'protractor', 'bin', 'protractor'));


