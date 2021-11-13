'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Couponcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Couponcode.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    used: DataTypes.BOOLEAN,
    shirt: DataTypes.BOOLEAN,


  }, {
    sequelize,
    modelName: 'Couponcode',
  });
  return Couponcode;
};
