hapi.js helpers
===============

[![npm install hapi-helpers](https://nodei.co/npm/hapi-helpers.png?compact=true)](https://www.npmjs.com/package/hapi-helpers)
<br>
[![Build Status](https://travis-ci.org/rsp/node-hapi-helpers.svg?branch=master)](https://travis-ci.org/rsp/node-hapi-helpers)
[![Test Coverage](https://coveralls.io/repos/rsp/node-hapi-helpers/badge.svg?branch=master)](https://coveralls.io/r/rsp/node-hapi-helpers?branch=master)
[![Code Climate](https://codeclimate.com/github/rsp/node-hapi-helpers/badges/gpa.svg)](https://codeclimate.com/github/rsp/node-hapi-helpers)
[![Known Vulnerabilities](https://snyk.io/test/github/rsp/node-hapi-helpers/00e3bcf13b72e18c0ae0676137c180e29cc64013/badge.svg)](https://snyk.io/test/github/rsp/node-hapi-helpers/00e3bcf13b72e18c0ae0676137c180e29cc64013)
[![Downloads](https://img.shields.io/npm/dt/hapi-helpers.svg)](http://npm-stat.com/charts.html?package=hapi-helpers)

[https://github.com/rsp/node-hapi-helpers](https://github.com/rsp/node-hapi-helpers)
([readme](https://github.com/rsp/node-hapi-helpers#readme))

Some helper functions for [hapi.js](http://hapijs.com/) to write less boilerplate code.

Currently it only simplifies the routes definitions.
Feature requests welcome via [issues](#issues).

It has no dependencies - only some devDependencies (it uses
[chai](https://github.com/chaijs/chai),
[mocha](https://github.com/mochajs/mocha),
[istanbul](https://github.com/gotwarlost/istanbul) and
[coveralls](https://github.com/cainus/node-coveralls)
for testing and test coverage,
and [Travis](https://travis-ci.org/) for continuous integration,
see: [https://travis-ci.org/rsp/node-hapi-helpers](https://travis-ci.org/rsp/node-hapi-helpers))

Example
-------
You can write:
```js
server.addRoutes([
    get('/a/{id}', getA),
    del('/a/{id}', delA),
    route('get put post delete', '/b', handleB)
]);
```
Instead of:
```js
server.addRoutes([
    {
        method: 'GET',
        path: '/a/{id}',
        handler: getA
    },
    {
        method: 'DELETE',
        path: '/a/{id}',
        handler: delA
    },
    {
        method: ['GET', 'PUT', 'POST', 'DELETE'],
        path: '/b',
        handler: handleB
    }
]);
```

Installation
------------
Install to use in your project, updating the dependencies in package.json:
```sh
npm install hapi-helpers --save
```

Usage
-----
To use `hh.get()`, `hh.post()` etc:
```js
var hh = require('hapi-helpers');
```
To use just `get()`, `post()` etc:
```js
var hh = require('hapi-helpers'),
    get = hh.get, post = hh.post; // ...
```
Or using [the ES6 destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):
```js
var {get, post} = require('hapi-helpers');
```

Routes
------
To simplify the definition of routes in hapi.js you can use:

### `hh.route(method, path, handler, config)`

where `config` is optional
and `method` can be a string or a list of strings e.g.:

* `'GET'`
* `'get'`
* `['get', 'post']`
* `'get post'`

You can use either `'del'` or `'delete'` for the DELETE method.

For example: `hh.route('get post', path, handler, config)`

It is a shortcut for:

```js
{
    method: ['GET', 'POST'],
    path: path,
    handler: handler,
    config: config
}
```

### `hh.get(path, handler, config)`
(`config` is optional) is a shortcut for:
```js
{
    method: 'GET',
    path: path,
    handler: handler,
    config: config
}
```
### `hh.post(path, handler, config)`
(`config` is optional) is a shortcut for:
```js
{
    method: 'POST',
    path: path,
    handler: handler,
    config: config
}
```
### `hh.put(path, handler, config)`
(`config` is optional) is a shortcut for:
```js
{
    method: 'PUT',
    path: path,
    handler: handler,
    config: config
}
```
### `hh.patch(path, handler, config)`
(`config` is optional) is a shortcut for:
```js
{
    method: 'PATCH',
    path: path,
    handler: handler,
    config: config
}
```
### `hh.del(path, handler, config)`
(`config` is optional) is a shortcut for:
```js
{
    method: 'DELETE',
    path: path,
    handler: handler,
    config: config
}
```
**Note:** it is `.del()` and not `.delete()`
because `delete` is a reserved word in JavaScript.
### `hh.options(path, handler, config)`
(`config` is optional) is a shortcut for:
```js
{
    method: 'OPTIONS',
    path: path,
    handler: handler,
    config: config
}
```
### `hh.all(path, handler, config)`
(`config` is optional) is a shortcut for:
```js
{
    method: '*',
    path: path,
    handler: handler,
    config: config
}
```

### Real world example

Here is real world example,
a route from [hapi-example](https://github.com/geek/hapi-example)
by [Wyatt Preul](https://github.com/geek):

```js
var Types = require('hapi').types;

module.exports = [{
    method: 'GET',
    path: '/products',
    config: {
        handler: getProducts,
        validate: {
            query: {
                name: Types.String()
            }
        }
    }
}, {
    method: 'GET',
    path: '/products/{id}',
    config: {
        handler: getProduct
    }
}, {
    method: 'POST',
    path: '/products',
    config: {
        handler: addProduct,
        payload: 'parse',
        validate: {
            payload: {
                name: Types.String().required().min(3)
            }
        }
    }
}];
```
Here is the same using hapi-helpers,
available on [hapi-helpers-example](https://github.com/rsp/hapi-helpers-example):
```js
var Types = require('hapi').types,
    hh = require('hapi-helpers'),
    get = hh.get,
    post = hh.post;

module.exports = [
    get('/products', getProducts, {
        validate: {
            query: {
                name: Types.String()
            }
        }
    }),
    get('/products/{id}', getProduct),
    post('/products', addProduct, {
        payload: 'parse',
        validate: {
            payload: {
                name: Types.String().required().min(3)
            }
        }
    })
];
```
The biggest difference is for simple routes like `'/products/{id}'`
which is one simple line with hapi-helpers.

This is work in progress - more to come.

Issues
------
For any bug reports or feature requests please
[post an issue on GitHub](https://github.com/rsp/node-hapi-helpers/issues).

Author
------
Rafał Pocztarski - [https://github.com/rsp](https://github.com/rsp)

License
-------
MIT License (Expat). See [LICENSE.md](LICENSE.md) for details.
