#!/usr/bin/env node

var app = require('../app');
var http = require('http');
var debug = require('debug');


var port = parsePort(process.env.PORT || '3000');

var server = http.createServer(app);
server.listen(port);
server.on('error',onError)
server.on('listening',onListening)

function parsePort(val: string) {
    var port = parseInt(val,10);
    if (port >=0) {
        return port;
    }
    return false;
}

function onError(error: Error) {
    throw error;
}

function onListening() {
    debug('started ...');
}