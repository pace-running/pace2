const DB = require('../models/index')
const Couponcode = DB.Couponcode;
const {Op} = require("sequelize");

exports.get = (req, res, next) => {
    Couponcode.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            next(err)
        })
}

exports.getByName = (req,res,next) => {
    const couponcodeName = req.params.name
    Couponcode.findOne({
        where: {
            name: couponcodeName
        }
    }).then(data =>
         res.send(data))
      .catch(err=>next(err))
}

exports.create = (req, res, next) => {
    const amount = req.body.amount;
    let promises = []
    const withShirt = req.body.shirt;
    const description = req.body.description;
    for (let i = 0; i < amount; i++) {
       promises.push(createCouponcode(withShirt, description))
    }
    Promise.all(promises).then(allNames => {
      res.status(201);
      res.send(allNames)
    }).catch(err => next(err))

}

async function createCouponcode(withShirt,description) {
    code = await Couponcode.create( {
        description: description,
        shirt: withShirt,
        used: false,
        name: couponName()
    })
    return code.name
}

function couponName() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return 'C-' + text;
}
