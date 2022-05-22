"use strict";

const csv = require('fast-csv');
const DB = require('../models/index')
const Participant = DB.Participant
const Shirt = DB.Shirt
const {Op} = require("sequelize");

const Queue = require('bee-queue');
const paymentConfirmationQueue = new Queue('paymentConfirmationEmail', {
    redis: {
        host: process.env.REDIS_HOST || "localhost"
    },
    isWorker: false,
});

const headers = [
    'Bezeichnung Auftragskonto',
    'IBAN Auftragskonto',
    'BIC Auftragskonto',
    'Bankname Auftragskonto',
    'Buchungstag',
    'Valutadatum',
    'Name Zahlungsbeteiligter',
    'IBAN Zahlungsbeteiligter',
    'BIC (SWIFT-Code) Zahlungsbeteiligter',
    'Buchungstext',
    'Verwendungszweck',
    'Betrag',
    'Waehrung',
    'Saldo nach Buchung',
    'Bemerkung',
    'Kategorie',
    'Steuerrelevant',
    'Glaeubiger ID',
    'Mandatsreferenz'
];
const TOKEN_LENGTH = 9;
const TOKEN_PREFIX = 'LGR-';

const buchungstagPattern = /\d{2}\.\d{2}\.\d{4}/;

function PaymentRow(statement) {
    const reason = statement['Verwendungszweck'];
    const removeUberweisung = (text) => text.replace(/^.*berweisungsgutschr\./, '');
    const removeNewLines = (text) => text.replace(/\n/g, ' ');
    const removeIBAN = (text) => text.replace(/IBAN:\sDE\d{20}/g, '');
    const removeBIC = (text) => text.replace(/BIC:\s\w{11}/, '');

    const getReason = () => reason;

    const getAmount = () => {
        return parseInt(statement.Betrag, 10);
    }

    const getPossibleTokens = () => {
        return removeBIC(removeIBAN(removeNewLines(removeUberweisung(reason))))
            .trim()
            .split(/[\s,.]+/)
            .filter(text => text.length === TOKEN_LENGTH)
            .map(text => text.replace('0','O'))
            .map(text => text.toUpperCase())
            .filter(text => text.startsWith(TOKEN_PREFIX));
    };

    return {
        getPossibleTokens,
        getReason,
        getAmount
    }
}

function parse(file, res) {
    return new Promise(resolve => {
        let banktransfers = []
        csv
            .parseFile(file, {delimiter: ';', headers: headers})
            .on('error', error => {
                console.error(error)
                res.end()
            })
            .on("data", statement => {
                if (buchungstagPattern.test(statement.Buchungstag)) {
                    let row = new PaymentRow(statement)
                    banktransfers.push({
                        found: row.getPossibleTokens(),
                        amount: row.getAmount(),
                        reason: row.getReason()
                    })
                }
            })
            .on("end", () => {
                console.log('done');
                resolve(banktransfers)
            })
    })
};

async function participantsByToken(tokenList) {
    let result = []
    for (const token of tokenList) {
        console.log("looking for token", token)
        let p = await Participant.findOne({
            where: {
                paymentToken: token
            }
        }).catch(err => {
            console.error(err)
        })
        if (p != null) {
            result.push(p)
        }
    }
    return result
}

function checkValidAmount(participants, amount) {
    let expectedAmount = 0;
    participants.forEach(p => {
        expectedAmount = expectedAmount + parseInt(p.expectedPayment)
    })
    return expectedAmount <= amount
}

async function markPayed(participants) {
    for (const p of participants) {
        if (p.hasPayed == false) {
            p.hasPayed = true
            p.save()
            const job = paymentConfirmationQueue.createJob(p);
            job.save()
        }
    }

}

async function findAndMarkAsPayed(banktransfers) {
    let result = []
    let count = 0;
    for (const banktranfer of banktransfers) {
        let participants = await participantsByToken(banktranfer.found)
        if (participants.length > 0) {
            count++
            let valid = checkValidAmount(participants, banktranfer.amount)
            if (valid == true) {
                markPayed(participants)
                result.push({
                    count: count,
                    result: true,
                    participants: participants,
                    tokens: banktranfer.found,
                    amount: banktranfer.amount
                })
            } else {
                result.push({
                    count: count,
                    error: "Betrag stimmt nicht überein",
                    result: false,
                    participants: participants,
                    tokens: banktranfer.found,
                    amount: banktranfer.amount
                })
            }
        } else {
            result.push({
                count: count,
                error: "Verwendungszweck nicht gefunden",
                result: false,
                tokens: banktranfer.found,
                amount: banktranfer.amount,
                reason: banktranfer.reason
            })
        }
    }
    return result
}

exports.importPayments = (req, res, next) => {
    let file = req.file.destination + req.file.filename;
    parse(file, res).then(banktransfers => {
        findAndMarkAsPayed(banktransfers)
            .then(result => {
                res.send(result)
            })
    }).catch(err => {
        next(err)
    })
}

exports.stats = (req, res, next) => {
    Participant.count({
        attributes: [
            'hasPayed',
            [DB.Sequelize.fn('sum', DB.Sequelize.col('expectedPayment')), 'total_amount'],
        ],
        group: ['hasPayed'],
    }).then(result => {
        res.status(200)
        res.send(result)
    }).catch(err => {next(err)})
}

exports.csv = (req, res, next) => {
    Participant.findAll({
            include: Shirt
        })
    .then(participants => {
        res.setHeader("content-type", "application/csv");
        res.setHeader('Content-disposition', 'attachment; filename=status.csv');
        const csvStream = csv.format({headers: true})
        csvStream.pipe(res)
        participants.forEach(p => {
            let shirt = ''
            if (p.getDataValue('Shirt')){
                shirt = p.getDataValue('Shirt').getDataValue('model') + '/' + p.getDataValue('Shirt').getDataValue('size')
            }
            csvStream.write({
                name: p.getDataValue('firstName') + ' ' + p.getDataValue('lastName'),
                startnumber: p.getDataValue('startNumber'),
                email: p.getDataValue('email'),
                shirt: shirt,
                token: p.getDataValue('paymentToken'),
                expected: p.getDataValue('expectedPayment'),
                payed: p.getDataValue('hasPayed'),
            })
        })
        csvStream.end();
    }).catch(err => {
        next(err)
    })
}

