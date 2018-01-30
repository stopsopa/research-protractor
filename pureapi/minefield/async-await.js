const log = (function(){try{return console.log}catch(e){return function(){}}}());

const fn = n => new Promise(resolve => {
    setTimeout(resolve, 2000, 'promise resolved: ' + n);
});

async function test () {
    log('start');
    log('msg', await fn(1));
    log('msg', await fn(2));
    log('end');
};

const fne = n => new Promise((resolve, reject) => {
   setTimeout(reject, 2000, 'promise rejected: ' + n);
});

async function teste () {
    log('start');
    log('msg', await fn(1));
    log('msg', await fne(2));
    log('msg', await fn(3));
    log('end')
}

(async function () {
    try {
        log('resolve test:')
        await test();
        log('reject test:');
        await teste();
    } catch (e) {
        log('catch: ', e)
    }
}());

// resolve test:
// start
// msg promise resolved: 1
// msg promise resolved: 2
// end
// reject test:
// start
// msg promise resolved: 1
// catch:  promise rejected: 2