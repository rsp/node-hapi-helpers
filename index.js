
// hapi-helpers
// https://github.com/rsp/node-hapi-helpers

"use strict";

module.exports = {
    route: route,
    get: get,
    post: post,
    put: put,
    patch: patch,
    del: del,
    options: options,
    all: all
};

/*
method is a string or array (required where present)
path is a string (required)
handler is a function, string or object (required)
config is an object (optional)
---
vhost is not supported yet
*/

function route(method, path, handler, config) {

    if( (typeof method !== 'string' && !Array.isArray(method))
        || (typeof path !== 'string')
        || (typeof handler !== 'function' && typeof handler !== 'string' && typeof handler !== 'object')
        || (config != null && typeof config !== 'object') ) {
        throw new TypeError('Bad arguments');
    }

    if (typeof method === 'string') {
        method = method.toUpperCase().replace(/[^A-Z*]+/g, ' ').trim().replace(/^DEL$/, 'DELETE');
        if (method.match(/ /)) {
            method = method.split(' ');
        }
    }
    if (Array.isArray(method)) {
        method = method.map(function (x) {
            return x.toUpperCase().replace(/[^A-Z*]+/g, ' ').trim().replace(/^DEL$/, 'DELETE');
        });
    }
    return {
        method: method,
        path: path,
        handler: handler,
        config: config
    };
}

function get(path, handler, config) {
    return route('GET', path, handler, config);
}

function post(path, handler, config) {
    return route('POST', path, handler, config);
}

function put(path, handler, config) {
    return route('PUT', path, handler, config);
}

function patch(path, handler, config) {
    return route('PATCH', path, handler, config);
}

function del(path, handler, config) {
    return route('DELETE', path, handler, config);
}

function options(path, handler, config) {
    return route('OPTIONS', path, handler, config);
}

function all(path, handler, config) {
    return route('*', path, handler, config);
}

