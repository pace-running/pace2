'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shirt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shirt.belongsTo(models.Participant, {
        foreignKey: 'participantId',
        onDelete: 'CASCADE'
      })
    }
  };
  Shirt.init({
    model: DataTypes.STRING,
    size: DataTypes.STRING,
    orderedAt: DataTypes.DATE,
    participantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shirt',
  });
  return Shirt;
};