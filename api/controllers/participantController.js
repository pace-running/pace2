const DB = require('../models/index')
const Participant = DB.Participant
const Op = DB.Sequelize.Op;
const crypto = require('crypto');
const _ = require('lodash');
const taskman = require('node-taskman');


exports.findAll = (req, res, next) => {
    const {page, size, search} = req.query;
    const {limit, offset} = getPagination(page, size)
    Participant.findAndCountAll({limit, offset})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            next(err)
        })
}

exports.update = (req, res, next) => {
    Participant.findByPk(req.params.id)
        .then((result) => {
            result.firstName = req.body.firstName;
            result.lastName = req.body.lastName;
            result.team = req.body.team,
                result.email = req.body.email,
                result.street = req.body.street,
                result.streetNumber = req.body.streetNumber,
                result.city = req.body.city,
                result.plz = req.body.plz,
                result.country = req.body.country,
                result.shirtSize = req.body.shirtSize,
                result.shirtModel = req.body.shirtModel,
                result.save()
            res.status(200)
            res.send({"updated": result.updatedAt})
        }).catch(err => {
        next(err)
    })
}

exports.shirts = (req, res, next) => {
    let payed = Participant.findAll({
        where: {hasPayed: true},
        group: ['shirtSize','shirtModel'],
        attributes: ['shirtSize','shirtModel', [DB.Sequelize.fn('COUNT', 'shirtSize'), 'count']],
    });
    let unpayed = Participant.findAll({
        where: {hasPayed: false},
        group: ['shirtSize','shirtModel'],
        attributes: ['shirtSize','shirtModel', [DB.Sequelize.fn('COUNT', 'shirtSize'), 'count']],
    });
    Promise.all([unpayed,payed])
        .then(values => {
            res.send({'unpayed':values[0], 'payed': values[1]})
        }).catch(err => {
            next(err)
    })
}
exports.markPayed = (req, res, next) => {
    Participant.findByPk(req.params.id)
        .then((result) => {
            result.hasPayed = req.body.hasPayed;
            result.save();
            res.send({"hasPayed": result.hasPayed});
        }).catch((err) => {
        next(err)
    })
}

exports.register = (req, res, next) => {
    return startNumber().then((number) => {
        Participant.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            street: req.body.street,
            streetNumber: req.body.streetNumber,
            city: req.body.city,
            plz: req.body.plz,
            team: req.body.team,
            shirtSize: req.body.shirtSize,
            shirtModel: req.body.shirtModel,
            country: req.body.country,
            hasPayed: false,
            startNumber: number,
            paymentToken: paymentToken(),
            secretToken: crypto.randomBytes(32).toString('hex')
        }).then((result) => {
            if (req.body.email.length > 0) {
                var queue = taskman.createQueue('confirmationEmail');
                queue.push(result);
            }
            res.status(201);
            res.send(result);
        }).catch((err) => {
            next(err)
        })
    })
}

function getPagination(page, size) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return {limit, offset}

}


async function startNumber() {
    return Participant.max('startNumber').then((result) => {
        if (isNaN(result)) {
            return 4;
        } else {
            return escape(result + 1);
        }
    })
}

function escape(nr) {
    if (_.includes([1, 2, 3, 18, 28, 33, 45, 74, 84, 88, 444, 191, 192, 198, 420, 1312, 1717, 1887, 1910, 1919, 1933, 1488, 1681], nr)) {
        return escape(nr + 1)
    } else {
        return nr;
    }
}

function paymentToken() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return 'LGR-' + text;
}
