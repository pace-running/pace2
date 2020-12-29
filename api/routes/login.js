const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtAuth = require('../middleware/auth');

const secretToken = process.env.PACE_JWT_TOKEN || 'secret_JWT_string'
const password = process.env.PACE_ADMIN_PASSWORD || 'secret'

router.post('/', (req, res,next) => {
    if (req.body.password == password && req.body.username == 'admin') {
        const user = {"username": "admin", "date": Date.now()};
        jwt.sign({user}, secretToken, (err, token) => {
            res.status('200');
            res.json({token, result: 'success'})
        })
    } else {
        res.status('403')
        res.json({result: "wrong password"})
    }
})

router.get('/',jwtAuth,(req, res, next) => {
    res.json({ result: 'success'});
})

module.exports = router;