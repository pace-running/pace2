'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      queryInterface.addColumn('Races', 'contactEmail', {
                type: Sequelize.DataTypes.STRING})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Races', 'contactEmail')
  }
};
