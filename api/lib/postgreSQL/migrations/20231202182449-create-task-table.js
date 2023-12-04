'use strict';

const { TASK_TABLE, TaskTableSchema } = require('../models/task.model');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TASK_TABLE, TaskTableSchema);
  },

  // eslint-disable-next-line no-unused-vars
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(TASK_TABLE);
  }
};
