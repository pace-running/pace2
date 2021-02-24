'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Participants', 'expectedPayment', {
                    type: 'INTEGER USING CAST("expectedPayment" as INTEGER)',
                    defaultValue: 10
                })
  },

  down: async (queryInterface, Sequelize) => {
  }
};
