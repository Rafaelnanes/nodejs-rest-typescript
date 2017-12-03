'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query('insert into prp_profile_permission (`prf_id`, `per_id`) VALUES(1,1);');
    queryInterface.sequelize.query('insert into prp_profile_permission (`prf_id`, `per_id`) VALUES(1,2);');
    queryInterface.sequelize.query('insert into prp_profile_permission (`prf_id`, `per_id`) VALUES(2,2);');
  },

  down: (queryInterface, Sequelize) => {

  }
};
