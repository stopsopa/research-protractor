
module.exports = {
    width: 640,
    height: 480,
    hub: {
        host: "localhost",
        port: 4445 // def 4444
    },
    node: {
        host: "127.0.0.1",
        port: 4446 // def 5555
    },
    waitToRunSeleniumCluster: 8, // sec
    curlTestMaxTime: 1 // sec
};