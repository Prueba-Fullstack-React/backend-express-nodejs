'use strict';

const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        id: 1,
        username: 'Prueba',
        email: 'prueba@mail.com',
        password: '1234AAAa'
      }
    ]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
