'use strict';

const { USER_TABLE, UserTableSchema } = require('../models/user.model');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserTableSchema);
  },

  // eslint-disable-next-line no-unused-vars
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
