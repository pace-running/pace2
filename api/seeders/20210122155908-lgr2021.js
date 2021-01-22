'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Races', [{
          name: 'Lauf gegen Rechts 2021',
          isOpen: false,
          shirtsEnabled: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Races', null, {});
      }
};
