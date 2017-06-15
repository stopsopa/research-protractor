/**
 * http://www.protractortest.org/#/tutorial#step-2-writing-multiple-scenarios
 */
describe('Protractor Demo App', function() {
    var firstNumber = element(by.model('first'));
    var secondNumber = element(by.model('second'));
    var goButton = element(by.id('gobutton'));
    var latestResult = element(by.binding('latest'));

    console.log("-".repeat(50) + "\n" + "-".repeat(50) + "\n" + "-".repeat(50) + "\n" + "-".repeat(50) + "\n");

    beforeEach(function() {

        browser.waitForAngularEnabled(false);
        // browser.ignoreSynchronization = true;

        browser.get('http://juliemr.github.io/protractor-demo/' /* , timeout:int */);
    });

    it('should have a title', function() {

        browser.executeScript(function () {
            document.addEventListener('DOMContentLoaded', function () {
                document.querySelector('body').style.border = "10px solid red";
            });
        });

        // browser.sleep(100000);
        // browser.angular(false);

        browser.executeScript(function () {
            document.querySelector('body').style.border = "10px solid blue";
        });

        expect(browser.getTitle()).toEqual('Super Calculator');
        expect(latestResult.getText()).toEqual('0');
    });

    // it('should add one and two', function() {
    //
    //     browser.angular(true);
    //
    //     firstNumber.sendKeys(1);
    //     secondNumber.sendKeys(2);
    //
    //     goButton.click();
    //
    //     expect(latestResult.getText()).toEqual('3');
    // });
    //
    // it('should add four and six', function() {
    //
    //     browser.angular(true);
    //
    //     // Fill this in.
    //     expect(latestResult.getText()).toEqual('0');
    // });
});