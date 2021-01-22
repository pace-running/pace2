'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Race extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Race.init({
    name: DataTypes.STRING,
    contactEmail: DataTypes.STRING,
    isOpen: DataTypes.BOOLEAN,
    shirtsEnabled: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Race',
  });
  return Race;
};
