'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Couponcodes', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          createdAt: {
              allowNull: false,
              type: Sequelize.DATE
          },
          updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
          },
          name: {
              allowNull: false,
              type: Sequelize.CITEXT,
          },
          description: {
              allowNull: true,
              type: Sequelize.CITEXT,
          },
          used: {
              allowNull: false,
              type: Sequelize.BOOLEAN,
          },
          shirt: {
              type: Sequelize.BOOLEAN,
          },
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Couponcodes');
  }
};
