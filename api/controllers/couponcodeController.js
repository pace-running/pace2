const DB = require('../models/index')
const Couponcode = DB.Couponcode;
const {Op} = require("sequelize");

exports.get = (req, res, next) => {
    const couponcodeName = req.params.couponcodeName
    Couponcode.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            next(err)
        })
 
}