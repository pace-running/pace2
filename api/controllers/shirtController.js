const DB = require('../models/index')
const Participant = DB.Participant
const Shirt = DB.Shirt
const {Op} = require("sequelize");


exports.stats = (req, res, next) => {
    let payed = statsByPaymentstatus(true);
    let unpayed = statsByPaymentstatus(false);
    Promise.all([unpayed, payed])
        .then(values => {
            res.send({'payed': values[0], 'unpayed': values[1]})
        }).catch(err => {
        next(err)
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