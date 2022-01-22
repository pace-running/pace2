'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Participants', 'on_site', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Participants', 'on_site')
  }
};
