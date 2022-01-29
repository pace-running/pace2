'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
      queryInterface.addColumn('Participants', 'pace', {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      })
    },

  down: async (queryInterface, Sequelize) => {
      queryInterface.removeColumn('Participants', 'pace')
  }
};
