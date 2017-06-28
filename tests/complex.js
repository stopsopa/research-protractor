
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
        // browser.angular(false);
        browser.get('http://juliemr.github.io/protractor-demo/');
        // browser.waitSelector('#gobutton');
        // browser.find('#gobutton');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Super Calculator');
    });

    it('should add one and two', function() {
        add(1, 2);
        expect(latestResult.getText()).toEqual('3');
        browser.sleep(2000);
    });
    //
    // it('should add four and six', function() {
    //     add(2, 2);
    //     // browser.sleep(2000);
    //     add(3, 4);
    //     // browser.sleep(2000);
    //
    //     expect(history.count()).toEqual(2);
    //
    //     add(4, 6);
    //
    //     // browser.sleep(2000);
    //
    //     browser.find('#gobutton');
    //
    //     expect(latestResult.getText()).toEqual('10');
    //
    //     browser.sleep(2000);
    // });
});