import express from 'express';
const router = express.Router();

const DB = require('../models/index');

router.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
        DB.User.findAll().then((result: any) => {
            console.log(result);
            res.send(result)
        }).catch((err: Error) => {
            next(err);
        })
    }
)

router.post('/add', function (req: express.Request, res: express.Response, next: express.NextFunction){
    return DB.User.findOrCreate({
        where: {
            firstName: req.body.firstName
        }
    }).then((result: Array<any | boolean>) => {
        console.log(result);
        if(result[1]) res.status(201)
        res.send(result[0])
    }).catch((err: Error) => {
        next(err)
    })
})

module.exports = router;
