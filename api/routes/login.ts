import express from "express";
const router = express.Router();
const jwt = require('jsonwebtoken');

const secretToken = process.env.PACE_JWT_TOKEN || 'please set a token via environment'

router.post('/',(req: express.Request,res: express.Response) => {
   const user = { "username": "admin", "date": Date.now() };
   jwt.sign({user},secretToken,(err: express.Errback,token: Array<any>) => {
      res.json({token})
   })
})

module.exports = router;