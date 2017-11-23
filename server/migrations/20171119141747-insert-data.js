'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('usr_user', [
      {
      usr_login: 'admin',
      usr_password: '21232f297a57a5a743894a0e4a801fc3'
    },
    {
      usr_login: 'guest',
      usr_password: '21232f297a57a5a743894a0e4a801fc3'
    }
  ], {});

    queryInterface.bulkInsert('per_permission', [{
      per_name: 'user.insert'
    },
    {
      per_name: 'user.list'
    }], {});
    
  },

  down: (queryInterface, Sequelize) => {
      queryInterface.bulkDelete('usr_user', null, {});
      queryInterface.bulkDelete('per_permission', null, {});
      queryInterface.bulkDelete('usp_user_permission', null, {});
  }
};
