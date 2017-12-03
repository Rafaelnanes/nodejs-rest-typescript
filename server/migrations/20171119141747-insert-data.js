'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.bulkInsert('prf_profile', [{
      prf_name: 'adm'
    },
    {
      prf_name: 'guest'
    }
    ], {});

    queryInterface.bulkInsert('usr_user', [
      {
        usr_login: 'admin',
        usr_password: '21232f297a57a5a743894a0e4a801fc3',
        prf_id: 1
      },
      {
        usr_login: 'guest',
        usr_password: '21232f297a57a5a743894a0e4a801fc3',
        prf_id: 2
      }
    ], {});

    queryInterface.bulkInsert('per_permission', [{
      per_name: 'user.operation'
    },
    {
      per_name: 'user.info'
    }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('usr_user', null, {});
    queryInterface.bulkDelete('per_permission', null, {});
    queryInterface.bulkDelete('prf_profile', null, {});
    queryInterface.bulkDelete('prf_profile_permission', null, {});
  }
};
