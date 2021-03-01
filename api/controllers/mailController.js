const DB = require('../models/index')
const csv = require('fast-csv')
const Participant = DB.Participant
const Shirt = DB.Shirt
const {Op} = require("sequelize");
const Queue = require('bee-queue');
const queue = new Queue('bulkmail', {
    redis: {
        host: process.env.REDIS_HOST || "localhost"
    },
    isWorker: false,
});


exports.testmail = (req, res, next) => {
    req.body.subject = "[TESTMAIL]" + req.body.subject
    const job = queue.createJob(req.body);
    res.status(201)
    job.save().catch(err => next(err))
}

exports.bulkmail = (req, res, next) => {
    console.log(req.body)
    Participant.findAll({attributes: ['email']})
        .then(result => {
            for (const resultItem of result) {
                const email = resultItem.getDataValue('email')
                if (email != null && email.length > 1) {
                    console.log(email)
                    const data = {
                        address: email,
                        subject: req.body.subject,
                        html: req.body.html
                    }
                    const job = queue.createJob(data);
                    res.status(201)
                    job.save().catch(err => next(err))
                }
            }
        })
}
