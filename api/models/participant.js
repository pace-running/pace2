'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participant.hasOne(models.Shirt, {
        foreignKey: 'participantId',
      })
    }
  };
  Participant.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    street: DataTypes.STRING,
    streetNumber: DataTypes.STRING,
    city: DataTypes.STRING,
    plz: DataTypes.STRING,
    country: DataTypes.STRING,
    startNumber: DataTypes.STRING,
    hasPayed: DataTypes.BOOLEAN,
    secretToken: DataTypes.STRING,
    paymentToken: DataTypes.STRING,
    expectedPayment: DataTypes.STRING,
    team: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Participant',
  });
  return Participant;
};
