#!/usr/bin/env node

var app = require('../app');
var http = require('http');
var debug = require('debug');


var port = process.env.PORT || '3000';

var server = http.createServer(app);
server.listen(port);
server.on('error',onError)
server.on('listening',onListening)


function onError(error) {
    throw error;
}

function onListening() {
    debug('started ...');
}