'use strict'
module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define('Participant', {
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        street: {
            type: DataTypes.STRING,
        },
        streetNumber: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        plz: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        startNumber: {
            type: DataTypes.INTEGER,
        },
        hasPayed: {
            type: DataTypes.BOOLEAN,
        },
        secretToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shirtModel: {
            type: DataTypes.STRING,
        },
        shirtSize: {
            type: DataTypes.STRING,
        },
        team: {
            type: DataTypes.STRING,
        }
    });

    return Participant;
}