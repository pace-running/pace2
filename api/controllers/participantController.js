const DB = require('../models/index')
const Queue = require('bee-queue');
const queue = new Queue('confirmationEmail', {
    redis: {
        host: process.env.REDIS_HOST || "localhost"
    },
    isWorker: false,
});
const paymentConfirmationQueue = new Queue('paymentConfirmationEmail', {
    redis: {
        host: process.env.REDIS_HOST || "localhost"
    },
    isWorker: false,
});
const Participant = DB.Participant
const Shirt = DB.Shirt
const Couponcode = DB.Couponcode;
const {Op} = require("sequelize");
const crypto = require('crypto');
const _ = require('lodash');


exports.findAll = (req, res, next) => {
    const {page, size, search} = req.query;
    const {limit, offset} = getPagination(page, size)
    let whereclause = null
    if (search) {
        whereclause = {
            [Op.or]: [
                {firstName: {[Op.substring]: search}},
                {lastName: {[Op.substring]: search}},
                {email: {[Op.substring]: search}},
                {team: {[Op.substring]: search}},
                {paymentToken: {[Op.substring]: search}},
                DB.sequelize.where(
                    DB.sequelize.cast(DB.sequelize.col('startNumber'), 'varchar'),
                    {[Op.substring]: search}
                )
            ]
        }
    }
    Participant.findAndCountAll({
        where: whereclause,
        include: Shirt,
        limit: limit,
        offset: offset,
        order: [
            ['startNumber', 'ASC']]
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            next(err)
        })
}

exports.update = (req, res, next) => {
    updateParticipant(req.body, req.params.id)
        .then((result) => {
            res.status(200)
            res.send({"updated": result.updatedAt})
        }).catch(err => {
        next(err)
    })
}

async function updateParticipant(participant, id) {
    const p = await Participant.findByPk(id)
    const s = await p.getShirt();
    p.firstName = participant.firstName;
    p.lastName = participant.lastName;
    p.team = participant.team;
    p.email = participant.email;
    p.street = participant.street;
    p.streetNumber = participant.streetNumber;
    p.city = participant.city;
    p.plz = participant.plz;
    p.expectedPayment = calculateAmount(participant)
    p.country = participant.country;
    if (participant.Shirt) {
        console.log(s)
        if (s != null) {
            console.log("saving shirt")
            s.model = participant.Shirt.model,
            s.size = participant.Shirt.size
            s.save();
        } else {
            console.log("creating shirt")
            const s = await Shirt.create({
                model: participant.Shirt.model,
                size: participant.Shirt.size
            })
            p.setShirt(s);
        }
    } else {
        if(s) {
            console.log("deleting Shirt")
            await s.destroy();
        }
    }
    console.log("saving")
    await p.save();
    return p
}

exports.byToken = (req,res,next) => {
    console.log('getting token')
    Participant.findOne({
        where: {
            secretToken: req.params.token
        },
        include: Shirt
    }).then(result => {
        res.status(200)
        res.send(result)
    }).catch((err) => {
        next(err)
    });
}

exports.markPayed = (req, res, next) => {
    Participant.findByPk(req.params.id,{include: Shirt})
        .then((result) => {
            result.hasPayed = req.body.hasPayed;
            result.save();
            if (req.body.hasPayed == true) {
                const job = paymentConfirmationQueue.createJob(result);
                job.save()
            }
            res.send({"hasPayed": result.hasPayed});
        }).catch((err) => {
        next(err)
    })
}

exports.register = (req, res, next) => {
    validateRegistrationData(req.body).then(() => {
    createParticipant(req.body)
        .then((result) => {
            if (req.body.email != null && req.body.email.length > 0) {
                const job = queue.createJob(result);
                job.save()
            }
           res.status(201);
            res.send(result);
        })
        .catch(err => {next(err)
    })
    }).catch(err => {
        res.status(400)
        res.send(err.message)
    })
}

exports.resendConfirmation = (req,res,next) => {
    Participant.findByPk(req.params.id,{include: Shirt})
        .then(participant => {
            if (participant.getDataValue('email')) {
                console.log('found  email address')
                const job = queue.createJob(participant);
                job.save()
            }
            res.status(200)
            res.send(participant)
        }).catch(err => next(err))
}

async function validateRegistrationData(data) {
    if (data.couponcodeId ) {
        couponcodeValid = await validateCouponcode(data.couponcodeId)
        if (couponcodeValid == false) {
            throw new Error("no valid couponcode")
        }
    return true
    }
}

async function validateCouponcode(id) {
    let coupponcode = await Couponcode.findOne({
        attributes: ['used'],
        where: {
            name: id,
            used: false,
        }
    })
    return coupponcode !== null
}

async function createParticipant(participant) {
    const number = await startNumber();
    let couponcode = {}
    if (participant.couponcodeId) {
        couponcode = await Couponcode.findOne({
            where: {name: participant.couponcodeId}
        })
    }
    const p = await Participant.create({
        firstName: participant.firstName,
        lastName: participant.lastName,
        email: participant.email,
        street: participant.street,
        streetNumber: participant.streetNumber,
        city: participant.city,
        plz: participant.plz,
        team: participant.team,
        country: participant.country,
        hasPayed: false,
        startNumber: number,
        paymentToken: paymentToken(),
        expectedPayment: calculateAmount(participant, couponcode),
        secretToken: crypto.randomBytes(32).toString('hex')
    })
    if (participant.Shirt) {
        const s = await Shirt.create({
            model: participant.Shirt.model,
            size: participant.Shirt.size
        })
        await p.setShirt(s)
    }
    if (participant.couponcodeId) {
        await p.setCouponcode(couponcode)
        couponcode.update({used: true})
        couponcode.save()
    }
    if(p.expectedPayment == 0) {
        console.log("####### no money expected")
        p.hasPayed = true
        await p.save()
    }
    return await byId(p.id);
}

async function byId(id) {
    return Participant.findByPk(id,{
        include: Shirt
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

function calculateAmount(participant,couponcode) {
    let amount = 10;
    if (participant.amount == "cheap") {
        amount = 5;
    }
    if (participant.amount == "couponcode") {
        amount = 0
    }
    if(participant.Shirt && couponcode.shirt != true) {
        amount = amount + 15
    }
    console.log(couponcode)
    return amount;
}

