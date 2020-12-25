import express from 'express';
const router = express.Router();
const crypto = require('crypto');
const _ = require('lodash');

const DB = require('../models/index');

router.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
        DB.Participant.findAll().then((result: any) => {
            console.log(result);
            res.send(result)
        }).catch((err: Error) => {
            next(err);
        })
    }
)

router.put('/register', function (req: express.Request, res: express.Response, next: express.NextFunction){
    return startNumber().then( (number) =>
    {
        DB.Participant.create({
            firstName:    req.body.firstName,
            lastName:     req.body.lastName,
            street:       req.body.street,
            streetNumber: req.body.streetnumber,
            city:         req.body.city,
            plz:          req.body.plz,
            team:         req.body.team,
            hasPayed:     false,
            startNumber:  number,
            secretToken:  crypto.randomBytes(32).toString('hex')
        }).then((result: Array<any | boolean>) => {
            console.log(result);
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

function escape(nr: number) :number {
    if(_.includes([1, 2, 3, 18, 28, 33, 45, 74, 84, 88, 444, 191, 192, 198, 420, 1312, 1717, 1887, 1910, 1919, 1933, 1488, 1681],nr)) {
        return escape(nr + 1)
    }
    else {
        return nr;
    }
}
module.exports = router;
