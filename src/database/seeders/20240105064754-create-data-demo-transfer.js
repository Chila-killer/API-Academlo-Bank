'use strict';

const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transfers', [
      {
        amount: 13000,
        sender_user_id: 2,
        receiver_user_id: 4,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        amount: 500,
        sender_user_id: 5,
        receiver_user_id: 1,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        amount: 46,
        sender_user_id: 3,
        receiver_user_id: 2,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        amount: 950,
        sender_user_id: 1,
        receiver_user_id: 3,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      },
      {
        amount: 160,
        sender_user_id: 3,
        receiver_user_id: 5,
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transfers', null, {});
  }
};
