// @ts-ignore
import express from 'express';
const router = express.Router();
// @ts-ignore
const crypto = require('crypto');
const _ = require('lodash');
const taskman = require('node-taskman');
const jwt = require('jsonwebtoken');

const DB = require('../models/index');

const secretToken = process.env.PACE_JWT_TOKEN || 'please set a token via environment'

router.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
    jwt.verify(req.headers.bearer,secretToken,(err:express.Errback,user:Array<any>)=> {
        if(user)
            res.sendStatus(403)
        else{
            DB.Participant.findAll().then((result: any) => {
                console.log(result);
                res.send(result)
            }).catch((err: Error) => {
                next(err);
            })
        }
    })

    }
)

router.put('/register', function (req: express.Request, res: express.Response, next: express.NextFunction){
    return startNumber().then( (number) =>
    {
        DB.Participant.create({
            firstName:    req.body.firstName,
            lastName:     req.body.lastName,
            email:        req.body.email,
            street:       req.body.street,
            streetNumber: req.body.streetnumber,
            city:         req.body.city,
            plz:          req.body.plz,
            team:         req.body.team,
            hasPayed:     false,
            startNumber:  number,
            paymentToken: paymentToken(),
            secretToken:  crypto.randomBytes(32).toString('hex')
        }).then((result: Array<any | boolean>) => {
            if (req.body.email.length > 0) {
                var queue = taskman.createQueue('confirmationEmail');
                queue.push(result);
            }
            res.status(201);
            res.send(result);
        }).catch((err: Error) => {
            next(err)
        })
    })
})


async function startNumber() {
    return DB.Participant.max('startNumber').then( (result: number) => {
        if (isNaN(result)) {
            return 4;
        } else {
            return escape(result + 1);
        }
    })
}

function paymentToken() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return 'LGR-' + text;
}

function escape(nr: number) :number {
    if(_.includes([1, 2, 3, 18, 28, 33, 45, 74, 84, 88, 444, 191, 192, 198, 420, 1312, 1717, 1887, 1910, 1919, 1933, 1488, 1681],nr)) {
        return escape(nr + 1)
    }
    else {
        return nr;
    }
}
module.exports = router;
