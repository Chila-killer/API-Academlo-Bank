'use strict';

const moment = require('moment');
const { encryptedPassword } = require('../../config/plugins/encryptedPassword.plugin');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [
      {
        name: 'User A',
        account_number: 123456,
        password: await encryptedPassword('1234567890'),
        amount: 497856,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'User B',
        account_number: 654321,
        password: await encryptedPassword('1234567890'),
        amount: 1004,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'User C',
        account_number: 864715,
        password: await encryptedPassword('1234567890'),
        amount: 5455,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'User D',
        account_number: 294567,
        password: await encryptedPassword('1234567890'),
        amount: 15312,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        name: 'User F',
        account_number: 835721,
        password: await encryptedPassword('1234567890'),
        amount: 61532,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
