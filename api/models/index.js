'use strict';

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const db = {};

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;


module.exports = db;