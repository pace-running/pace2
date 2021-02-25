const DB = require('../models/index')
const csv = require('fast-csv')
const Participant = DB.Participant
const Shirt = DB.Shirt
const {Op} = require("sequelize");


exports.stats = (req, res, next) => {
    let payed = statsByPaymentstatus(true);
    let unpayed = statsByPaymentstatus(false);
    let order_missing = unordered()
    Promise.all([unpayed, payed,order_missing])
        .then(values => {
            res.send({'payed': values[0], 'unpayed': values[1], 'order_missing': values[2]})
        }).catch(err => {
        next(err)
    })
}

async function unordered() {
    return Shirt.findAll({
        group: ['size', 'model'],
        attributes: ['size', 'model', [DB.Sequelize.fn('COUNT', 'size'), 'count']],
        where: {'orderedAt': null},
        include: {
            model: Participant,
            attributes: [],
            where: {
                hasPayed: {
                    [Op.eq]: true
                }
            }
        },
    })
}


async function statsByPaymentstatus(status) {
    return Shirt.findAll({
        group: ['size', 'model'],
        include: {
            model: Participant,
            attributes: [],
            where: {
                hasPayed: {
                    [Op.ne]: status
                }
            }
        },
        attributes: ['size', 'model', [DB.Sequelize.fn('COUNT', 'size'), 'count']],
    })
}

async function markOrdered() {
 //return DB.sequelize.query('SELECT * from "Shirts" LEFT JOIN "Participants" ON "Participants".id = "Shirts"."participantId"')
 return DB.sequelize.query('update "Shirts" set "orderedAt" = current_timestamp from "Participants" where "Shirts"."participantId" = "Participants".id and "Participants"."hasPayed" = TRUE and "Shirts"."orderedAt" IS NULL')
}

exports.markShirtsAsOrdered = (req,res,next) => {
    markOrdered().then(result =>{
        res.send(result)
    }).catch(err => {next(err)})
}

exports.shirtCSV = (req, res, next) => {
    Participant.findAll({
            where: {
                hasPayed: true,
                '$Shirt.id$': {[Op.ne]: null}
            },
            order: [['Shirt', 'size'], ['Shirt', 'model']],
            include: Shirt
        }
    ).then(participants => {
        res.setHeader("content-type", "application/pdf");
        res.setHeader('Content-disposition', 'attachment; filename=adressen.csv');
        const csvStream = csv.format({headers: true})
        csvStream.pipe(res)
        participants.forEach(p => {
            csvStream.write({
                name: p.getDataValue('firstName') + ' ' + p.getDataValue('lastName'),
                strasse: p.getDataValue('street') + ' ' + p.getDataValue('streetNumber'),
                stadt: p.getDataValue('plz') + ' ' + p.getDataValue('city'),
                land: p.getDataValue('country'),
                shirt: p.getDataValue('Shirt').getDataValue('model') + '/' + p.getDataValue('Shirt').getDataValue('size')
            })
        })
        csvStream.end();
    }).catch(err => {
        next(err)
    })


}