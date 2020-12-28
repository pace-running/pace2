const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const secretToken = process.env.PACE_JWT_TOKEN || 'please set a token via environment'

router.post('/',(req,res) => {
   const user = { "username": "admin", "date": Date.now() };
   jwt.sign({user},secretToken,(err ,token) => {
      res.json({token})
   })
})

module.exports = router;