'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Participants', 'address_firstname', {
      type: Sequelize.DataTypes.STRING})
    queryInterface.addColumn('Participants', 'address_lastname', {
      type: Sequelize.DataTypes.STRING})
    queryInterface.addColumn('Participants', 'address_extra', {
      type: Sequelize.DataTypes.STRING})
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Participants', 'address_firstname')
    queryInterface.removeColumn('Participants', 'address_lastname')
    queryInterface.removeColumn('Participants', 'address_extra')
}
};
