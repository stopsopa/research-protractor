describe('Protractor Demo App', function() {
    var firstNumber = element(by.model('first'));
    var secondNumber = element(by.model('second'));
    var goButton = element(by.id('gobutton'));
    var latestResult = element(by.binding('latest'));
    var history = element.all(by.repeater('result in memory'));

    function add(a, b) {
        element(by.model('first')).sendKeys(a);
        element(by.model('second')).sendKeys(b);
        goButton.click();
    }

    beforeEach(function() {
        browser.get('https://stopsopa.github.io/research-protractor/e2e/angular-calc/calc.html');
    });

    it('1+2', function() {
        add(1, 2);
        expect($('h2').getText()).toEqual('3');
    });

    it('1+2 and 2+2', function() {
        add(1, 2);
        expect($('h2').getText()).toEqual('3');
        add(2, 2);
        expect($('h2').getText()).toEqual('4');
    });

    it('counting history', function() {
        add(1, 2);
        expect($('h2').getText()).toEqual('3');
        add(2, 2);
        expect($('h2').getText()).toEqual('4');
        expect(history.count()).toEqual(2);

        // return protractor.ExpectedConditions.js(createFunction(name));

        // browser.waitJs(function () {
        //     var h2 = document.querySelector('h2');
        //     if (h2 && h2.innerText === '3') {
        //         return h2.innerText;
        //     }
        //     return false;
        // }, 5000).then(function (d) {
        //     expect(d).toEqual('3');
        // });
        // // expect(latestResult.getText()).toEqual('3');
        // browser.sleep(2000);
    });

    it('counting history two times', function() {
        add(1, 2);
        expect($('h2').getText()).toEqual('3');
        add(2, 2);
        expect($('h2').getText()).toEqual('4');
        expect(history.count()).toEqual(2);
        add(2, 3);
        expect($('h2').getText()).toEqual('5');
        expect(history.count()).toEqual(3);
    });
});