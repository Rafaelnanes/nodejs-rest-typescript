'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query('insert into usp_user_permission (`usr_id`, `per_id`) VALUES(1,1);');
    queryInterface.sequelize.query('insert into usp_user_permission (`usr_id`, `per_id`) VALUES(1,2);');
    queryInterface.sequelize.query('insert into usp_user_permission (`usr_id`, `per_id`) VALUES(2,2);');
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
