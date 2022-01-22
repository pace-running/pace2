'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Couponcodes', 'participantId', {
      type: Sequelize.DataTypes.INTEGER})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Couponcodes', 'participantId')
  }
};
