'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Shirts', 'orderedAt', {
      type: Sequelize.DataTypes.DATE})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Shirts', 'orderedAt')
  }
};
