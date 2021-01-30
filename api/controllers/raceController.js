const DB = require('../models/index')
const Race = DB.Race
const {Op} = require("sequelize");


exports.get = (req, res, next) => {
    Race.findOne()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            next(err)
        })
}

exports.toggleIsOpen = (req, res, next) => {
    Race.findOne()
        .then(race => {
            race.isOpen = !race.isOpen;
            race.save();
            res.send({"isOpen": race.isOpen});
        })
        .catch(err => {
            next(err)
        })
}
exports.toggleShirtsEnabled = (req, res, next) => {
    Race.findOne()
        .then(race => {
            race.shirtsEnabled = !race.shirtsEnabled;
            race.save();
            res.send({"shirtsEnabled": race.shirtsEnabled});
        })
        .catch(err => {
            next(err)
        })
}

exports.name = (req,res,next) => {
    Race.findOne()
        .then(race => {
            race.name = req.body.name;
            race.save();
            res.send({"name": race.name})
        })
        .catch(err => {
            next(err)
        })
}
