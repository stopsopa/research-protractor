'use strict';

const color = require('color');

const log = console.log;

const path = require('path');

const jest = path.resolve(__dirname, 'node_modules', 'jest', 'bin', 'jest.js');


// log(process.argv)
// process.exit(0);
//
// var b = '';
// if (process.argv.indexOf('-b') > -1) {
//     var i = process.argv.indexOf('-b');
//     b = process.argv[i + 1];
//     process.argv.splice(i, 2);
// }

require(jest);

// process.on('uncaughtException', function (err) {
//     log('test.js general error'.red + "\n\n");
//     console.error(err.stack);
//     console.log("Node NOT Exiting...");
//     driver.quit();
//     process.exit(1);
// });

// process.on('exit', function (){
// });
