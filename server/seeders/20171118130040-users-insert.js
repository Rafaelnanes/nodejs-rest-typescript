'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usr_user', [{
        usr_login: 'admin',
        usr_password: 'admin'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usr_user', null, {});
  }
};