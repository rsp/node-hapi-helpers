var assert = require('chai').assert,
    hh = require('../index');

describe('#hh.method()', function () {
    it('should be a function', function () {
       assert.typeOf(hh.method, 'function', 'hh.method is a function');
    });
});
