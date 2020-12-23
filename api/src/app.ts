import express = require('express');

import {join} from 'path';
import cors from 'cors';
const magic = require('express-routemagic');
const app: express.Application = express();


app.use(cors({
    credentials: true,
    origin: true,
    methods: ['Get, HEAD, PUT, PATCH, POST, DELETE'],
    preflightContinue: true
}))

app.set('views', join(__dirname, 'views'));

app.use(express.json())
app.use(cors())

magic.use(app);


module.exports = app