// 
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//
"use strict";
// The module 'assert' provides assertion methods from node
var assert = require('assert');
var trello_1 = require('../src/trello');
// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {
    // Defines a Mocha unit test
    test("Something 1", function () {
        assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
    });
    test("Trello 1", function () {
        var trelloClient = new trello_1.default("123", "123");
        assert.equal("Hello!", trelloClient.testingT());
    });
});
//# sourceMappingURL=extension.test.js.map