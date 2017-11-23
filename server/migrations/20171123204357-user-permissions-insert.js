'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query('insert into usp_user_permission VALUES(1,1);');
    queryInterface.sequelize.query('insert into usp_user_permission VALUES(1,2)');
    queryInterface.sequelize.query('insert into usp_user_permission VALUES(2,1)');
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
