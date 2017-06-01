'use strict';

const path = require('path');

/**
 * http://www.protractortest.org/#/page-objects
 */
describe('Protractor Demo App', function() {

    it('', function() {

        browser.angular(false);

        // parentheses are important if you want to create object in "oneliner"
        var pageObject = new (require(path.resolve(__dirname, 'pageObjects', 'PageObject.js')));

        pageObject.navigate();

        pageObject.setName('name');

        pageObject.setSurname('surname');

        expect(pageObject.getName()).toBe('name...');

        expect(pageObject.getSurname()).toBe('surname...');
    });
});