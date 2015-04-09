var assert = require('chai').assert,
    hh = require('../index');

describe('#hh.method()', function () {
    it('should be a function', function () {
       assert.typeOf(hh.method, 'function', 'hh.method is a function');
    });
    it('should return an object with correct method', function () {
        assert.propertyVal(hh.method('GET', '/', 'h'), 'method', 'GET');
    });
    it('should return an object with correct uppercased method', function () {
        assert.propertyVal(hh.method('get', '/', 'h'), 'method', 'GET');
    });
    it('should work with array of methods', function () {
        assert.deepEqual(hh.method(['get', 'post'], '/', 'h').method, ['GET', 'POST']);
    });
    it('should work with list of methods as one string', function () {
        assert.deepEqual(hh.method('get post', '/', 'h').method, ['GET', 'POST']);
    });
    it('should work with list of methods as one string with punctuation', function () {
        assert.deepEqual(hh.method('  get ,  post  ', '/', 'h').method, ['GET', 'POST']);
    });

});

describe('#hh.get()', function () {
    it('should be a function', function () {
        assert.typeOf(hh.get, 'function', 'hh.get is a function');
    });
    it('should return an object with GET', function () {
        assert.propertyVal(hh.get('/', 'h'), 'method', 'GET');
    });
    it('should return object with correct values', function () {
        var got = hh.get('/path', {some: 'handler'}, {some: 'config'});
        var expected = {method: 'GET', path: '/path', handler: {some: 'handler'}, config: {some: 'config'}};
        assert.deepEqual(got, expected);
    });
});

describe('#hh.post()', function () {
    it('should be a function', function () {
        assert.typeOf(hh.post, 'function', 'hh.post is a function');
    });
    it('should return an object with POST', function () {
        assert.propertyVal(hh.post('/', 'h'), 'method', 'POST');
    });
});

describe('#hh.put()', function () {
    it('should be a function', function () {
        assert.typeOf(hh.put, 'function', 'hh.put is a function');
    });
    it('should return an object with PUT', function () {
        assert.propertyVal(hh.put('/', 'h'), 'method', 'PUT');
    });
});

describe('#hh.patch()', function () {
    it('should be a function', function () {
        assert.typeOf(hh.patch, 'function', 'hh.patch is a function');
    });
    it('should return an object with PATCH', function () {
        assert.propertyVal(hh.patch('/', 'h'), 'method', 'PATCH');
    });
});

describe('#hh.del()', function () {
    it('should be a function', function () {
        assert.typeOf(hh.del, 'function', 'hh.del is a function');
    });
    it('should return an object with DELETE', function () {
        assert.propertyVal(hh.del('/', 'h'), 'method', 'DELETE');
    });

});

describe('#hh.options()', function () {
    it('should be a function', function () {
        assert.typeOf(hh.options, 'function', 'hh.options is a function');
    });
    it('should return an object with OPTIONS', function () {
        assert.propertyVal(hh.options('/', 'h'), 'method', 'OPTIONS');
    });
});

describe('#hh.all()', function () {
    it('should be a function', function () {
        assert.typeOf(hh.all, 'function', 'hh.all is a function');
    });
    it('should return an object with *', function () {
        assert.propertyVal(hh.all('/', 'h'), 'method', '*');
    });

});
