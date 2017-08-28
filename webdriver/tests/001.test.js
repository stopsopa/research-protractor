'use strict';

const path = require('path');

const add = require(path.resolve(__dirname, 'lib', 'add'));

const log = console.log;

// (function (old) {
//     const list = ['one', 'two', 'three'];
//     it = function () {
//         list.forEach((i) => {
//             let args = Array.prototype.slice.call(arguments);
//             if (args[0]) {
//                 args[0] = i + ': ' + args[0];
//             }
//             old.apply(this, args);
//         });
//     }
// }(it));

it('add test', (done) => {
    expect(add(2, 3)).toEqual(5);

    setTimeout(done, 1000)
});