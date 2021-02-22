'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Participants', 'expectedPayment', {
      type: Sequelize.DataTypes.STRING})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Participants', 'expectedPayment')
  }
};
