'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Shirts', 'printedAt', {
      type: Sequelize.DataTypes.DATE})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Shirts', 'printedAt')
  }
};
