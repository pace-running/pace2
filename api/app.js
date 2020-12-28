'use strict';
const express = require('express');

const cors = require('cors');
const magic = require('express-routemagic');
const app = express();


app.use(cors({
    credentials: true,
    origin: true,
    methods: ['Get, HEAD, PUT, PATCH, POST, DELETE'],
    preflightContinue: true
}))

app.use(express.json())
app.use(cors())

magic.use(app);


module.exports = app