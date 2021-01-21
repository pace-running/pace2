'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;');
    await queryInterface.createTable('Participants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      firstName: {
        type: Sequelize.CITEXT,
      },
      lastName: {
        type: Sequelize.CITEXT,
      },
      email: {
        type: Sequelize.CITEXT,
      },
      street: {
        type: Sequelize.CITEXT,
      },
      streetNumber: {
        type: Sequelize.CITEXT,
      },
      city: {
        type: Sequelize.CITEXT,
      },
      plz: {
        type: Sequelize.CITEXT,
      },
      country: {
        type: Sequelize.CITEXT,
      },
      startNumber: {
        type: Sequelize.INTEGER,
      },
      hasPayed: {
        type: Sequelize.BOOLEAN,
      },
      secretToken: {
        type: Sequelize.CITEXT,
        allowNull: false,
      },
      paymentToken: {
        type: Sequelize.CITEXT,
        allowNull: false,
      },
      shirtModel: {
        type: Sequelize.CITEXT,
      },
      shirtSize: {
        type: Sequelize.CITEXT,
      },
      team: {
        type: Sequelize.CITEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Participants');
  }
};