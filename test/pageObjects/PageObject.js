/**
 * http://www.protractortest.org/#/page-objects
 */
module.exports = function() {

    var ename        = element(by.css('[name="name"]'));
    var esurname     = element(by.css('[name="surname"]'));

    this.navigate = function() {
        browser.get('/fixtures/pageObject.html' /* , timeout:int */);
    };

    this.setName = function(name) {
        ename.sendKeys(name);
    };

    this.getName = function () {
        return ename.getAttribute('value').then(function (val) {
            return val + '...';
        });
    }

    this.setSurname = function(surname) {
        esurname.sendKeys(surname)
    };

    this.getSurname = function () {
        return esurname.getAttribute('value').then(function (val) {
            return val + '...';
        });
    }
};