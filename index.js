
// hapi-helpers
// https://github.com/rsp/node-hapi-helpers

module.exports = {
    method: method,
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

function method(Method, path, handler, config) {
    return {
        method: Method.toUpperCase(),
        path: path,
        handler: handler,
        config: config
    };
}

function get(path, handler, config) {
    return method('GET', path, handler, config);
}

function post(path, handler, config) {
    return method('POST', path, handler, config);
}

function put(path, handler, config) {
    return method('PUT', path, handler, config);
}

function patch(path, handler, config) {
    return method('PATCH', path, handler, config);
}

function del(path, handler, config) {
    return method('DELETE', path, handler, config);
}

function options(path, handler, config) {
    return method('OPTIONS', path, handler, config);
}

function all(path, handler, config) {
    return method('*', path, handler, config);
}

