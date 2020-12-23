'use strict';

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const ParticipantModel = require("./participant")(sequelize,Sequelize.DataTypes);
const db = {};

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
} catch (error) {
    console.error('Unable to connect to the database:', error);
}



db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Participant = ParticipantModel;


module.exports = db;